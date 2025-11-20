import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { MainLayout} from '@/Components';
import { 
  GaleriIklan, Beranda, PaketDanHarga,
  KebijakanPrivasi, SyaratDanKetentuan, CaraKerja, TentangKami,
  KosWanitaAzka, SignIn, SignUp
} from '@/Pages';


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/Pages" element={<MainLayout replace />}>
          <Route path="galeri-iklan" element={<GaleriIklan />} />
          <Route path="beranda" element={<Beranda/>}/>
          <Route path="cara-kerja" element={<CaraKerja pages={true}/>}/>
          <Route path="paket-dan-harga" element={<PaketDanHarga />} />
          <Route path="tentang-kami" element={<TentangKami />} />
          <Route path="kebijakan-privasi" element={<KebijakanPrivasi/>}/>
          <Route path="syarat-dan-ketentuan" element={<SyaratDanKetentuan/>}/>
          <Route index element={<Navigate to="/Pages/galeri-iklan"/>} />
        </Route>

        <Route path="/Pages/kos-azka" element={<KosWanitaAzka />} />
        
        <Route path="/auntifikasi/sign-in" element={<SignIn />} />
        <Route path="/auntifikasi/sign-up" element={<SignUp />} />

        <Route path="/" element={<Navigate to="/Pages/galeri-iklan" replace />} />
        <Route path="*" element={<Navigate to="/Pages/galeri-iklan" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router> 
      <AnimatedRoutes />
    </Router>
  );
}