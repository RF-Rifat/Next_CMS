import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, ObjectId } from '@/nx/mongodb';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import { cookies } from 'next/headers';

const USER_ROLES = ['Administrator', 'Editor', 'Author', 'Contributor', 'Subscriber'];

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin';
const ADMIN_SESSION = 'admin_env_session';

async function getUserCollection() {
  const db = await getDatabase();
  return db.collection('users');
}

// Helper: Get user from session cookie
async function getUserFromSession(req: NextRequest) {
  const sessionCookie = req.cookies.get('session');
  const session = typeof sessionCookie === 'string' ? sessionCookie : sessionCookie?.value;
  if (!session) return null;
  if (session === ADMIN_SESSION) {
    return { name: 'Admin', email: ADMIN_EMAIL, role: 'Administrator', env: true, _id: 'env-admin' };
  }
  const users = await getUserCollection();
  const user = await users.findOne({ session });
  return user;
}

// POST: Register or Login
export async function POST(req: NextRequest) {
  const body = await req.json();
  const users = await getUserCollection();

  if (body.action === 'register') {
    // Only allow registration if no admin exists
    const adminExists = await users.findOne({ role: 'Administrator' });
    if (adminExists) {
      return NextResponse.json({ error: 'Registration closed' }, { status: 403 });
    }
    const { name, email, password } = body;
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const hash = await bcrypt.hash(password, 10);
    const session = Math.random().toString(36).slice(2);
    const user = {
      name,
      email,
      password: hash,
      role: 'Administrator',
      session,
      createdAt: new Date(),
    };
    await users.insertOne(user);
    const res = NextResponse.json({ user: { name, email, role: 'Administrator' } });
    res.headers.set('Set-Cookie', serialize('session', session, { path: '/', httpOnly: true, sameSite: 'lax' }));
    return res;
  }

  if (body.action === 'login') {
    const { email, password } = body;
    console.log('LOGIN ATTEMPT:', { email, password, ADMIN_EMAIL, ADMIN_PASS });
    // Check for .env admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      // Set a special session for env admin
      const res = NextResponse.json({ user: { name: 'Admin', email: ADMIN_EMAIL, role: 'Administrator', env: true } });
      res.headers.set('Set-Cookie', serialize('session', ADMIN_SESSION, { path: '/', httpOnly: true, sameSite: 'lax' }));
      return res;
    }
    const user = await users.findOne({ email });
    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    // Generate new session
    const session = Math.random().toString(36).slice(2);
    await users.updateOne({ _id: user._id }, { $set: { session } });
    const res = NextResponse.json({ user: { name: user.name, email: user.email, role: user.role } });
    res.headers.set('Set-Cookie', serialize('session', session, { path: '/', httpOnly: true, sameSite: 'lax' }));
    return res;
  }

  if (body.action === 'add') {
    // Only admin can add users
    const sessionUser = await getUserFromSession(req);
    if (!sessionUser || sessionUser.role !== 'Administrator') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const { username, email, firstName, lastName, website, password, roles, sendNotification } = body;
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Username, Email, and Password are required' }, { status: 400 });
    }
    const users = await getUserCollection();
    const exists = await users.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return NextResponse.json({ error: 'Username or Email already exists' }, { status: 400 });
    }
    const hash = await bcrypt.hash(password, 10);
    const user = {
      username,
      email,
      firstName: firstName || '',
      lastName: lastName || '',
      website: website || '',
      password: hash,
      roles: Array.isArray(roles) && roles.length ? roles : ['Subscriber'],
      role: Array.isArray(roles) && roles.length ? roles[0] : 'Subscriber', // for compatibility
      createdAt: new Date(),
    };
    await users.insertOne(user);
    // (Optional: send notification email here)
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

// GET: Get current user (from session) or all users (admin only)
export async function GET(req: NextRequest) {
  const user = await getUserFromSession(req);
  const url = new URL(req.url);
  if (url.searchParams.get('all') === '1') {
    // Only admin can list all users
    if (!user || user.role !== 'Administrator') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    const users = await getUserCollection();
    const allUsers = await users.find({}, { projection: { password: 0, session: 0 } }).toArray();
    // Add env admin to the list, but use a unique _id that won't conflict with ObjectId
    allUsers.unshift({ _id: 'env-admin' as any, name: 'Admin', email: ADMIN_EMAIL, role: 'Administrator', env: true });
    return NextResponse.json({ users: allUsers });
  }
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({ user: { name: user.name, email: user.email, role: user.role, _id: user._id, env: user.env } });
}

// PATCH: Update user (admin only)
export async function PATCH(req: NextRequest) {
  const sessionUser = await getUserFromSession(req);
  if (!sessionUser || sessionUser.role !== 'Administrator') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { _id, password, roles, ...update } = await req.json();
  if (_id === 'env-admin') {
    return NextResponse.json({ error: 'Cannot edit env admin' }, { status: 403 });
  }
  if (password && password.length > 0) {
    update.password = await bcrypt.hash(password, 10);
  }
  if (roles && Array.isArray(roles) && roles.length) {
    update.roles = roles;
    update.role = roles[0];
  }
  const users = await getUserCollection();
  if (typeof _id !== 'string') {
    return NextResponse.json({ error: 'Invalid user id' }, { status: 400 });
  }
  await users.updateOne({ _id: new ObjectId(_id) }, { $set: update });
  return NextResponse.json({ success: true });
}

// DELETE: Delete user (admin only)
export async function DELETE(req: NextRequest) {
  const sessionUser = await getUserFromSession(req);
  if (!sessionUser || sessionUser.role !== 'Administrator') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const { _id } = await req.json();
  if (_id === 'env-admin') {
    return NextResponse.json({ error: 'Cannot delete env admin' }, { status: 403 });
  }
  const users = await getUserCollection();
  if (typeof _id !== 'string') {
    return NextResponse.json({ error: 'Invalid user id' }, { status: 400 });
  }
  await users.deleteOne({ _id: new ObjectId(_id) });
  return NextResponse.json({ success: true });
}
