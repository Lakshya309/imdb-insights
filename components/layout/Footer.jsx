export default function Footer() {
    return (
        <footer className="w-full border-t border-slate-200 py-8 mt-20">
            <div className="max-w-6xl mx-auto px-6 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} Lakshya Tekwani. All rights reserved.
            </div>
        </footer>
    );
}