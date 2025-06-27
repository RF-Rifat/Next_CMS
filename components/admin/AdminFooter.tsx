import Link from 'next/link';
const AdminFooter = () => {
  return (
    <footer className="bg-white block">
        <div className='container p-4'>
            <div className="w-full flex items-center justify-between">
                <p>
                    copyright &copy; {new Date().getFullYear()} <Link href="/" className='text-blue-500 hover:underline'>NX-CMS</Link>
                </p>
                <span>
                    <Link href="/nx-admin" className='text-sm py-2'>
                        on HOTLancer 
                    </Link>
                </span>
            </div>
        </div>
    </footer>
  );
};

export default AdminFooter;