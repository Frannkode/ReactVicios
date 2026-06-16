const SplashScreen = () => (
  <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center z-[999] animate-pulse">
    <div className="flex flex-col items-center gap-3">
      <div className="w-20 h-20 bg-red-500 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,0.4)]">
        <span className="text-4xl">🍔</span>
      </div>
      <div className="text-center mt-2">
        <div className="text-3xl font-black tracking-tight">
          VICIO'S <span className="text-red-500">BURGER</span>
        </div>
        <div className="text-zinc-500 text-sm font-semibold mt-1 tracking-widest uppercase">Un vicio del que no salís</div>
      </div>
    </div>
  </div>
);

export default SplashScreen;
