import { useState, useEffect } from "react";

interface Props {
  qris: string;
  bankLogo: string;
}

const WeddingGiftButton = ({ qris, bankLogo }: Props) => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showCashlessModal, setShowCashlessModal] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  const [animateGiftModal, setAnimateGiftModal] = useState(false);
  const [animateCashlessModal, setAnimateCashlessModal] = useState(false);

  const openGiftModal = () => {
    setShowGiftModal(true);
    setTimeout(() => setAnimateGiftModal(true), 10);
    setShowCashlessModal(false);
    setAnimateCashlessModal(false);
  };

  const openCashlessModal = () => {
    setShowCashlessModal(true);
    setTimeout(() => setAnimateCashlessModal(true), 10);
    setShowGiftModal(false);
    setAnimateGiftModal(false);
    setCopyMessage("");
  };

  const closeGiftModal = () => {
    setAnimateGiftModal(false);
    setTimeout(() => setShowGiftModal(false), 300);
  };

  const closeCashlessModal = () => {
    setAnimateCashlessModal(false);
    setTimeout(() => {
      setShowCashlessModal(false);
      setCopyMessage("");
    }, 300);
  };

  const closeModals = () => {
    closeGiftModal();
    closeCashlessModal();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyMessage(`Nomor rekening ${text} berhasil disalin!`);
        setTimeout(() => setCopyMessage(""), 3000);
      })
      .catch((err) => {
        console.error("Gagal menyalin teks: ", err);
        setCopyMessage("Gagal menyalin teks. Silakan coba lagi.");
      });
  };

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: { key: string }) => {
      if (event.key === "Escape") {
        closeModals();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <>
      <div className="mx-auto flex justify-evenly max-w-md">
        <button
          onClick={openGiftModal}
          className="bg-coklat-petro text-white px-3 py-1.5 rounded hover:cursor-pointer hover:scale-105 transition-all duration-200"
        >
          QRIS
        </button>
        <button
          onClick={openCashlessModal}
          className="bg-coklat-petro text-white px-3 py-1.5 rounded hover:cursor-pointer hover:scale-105 transition-all duration-200"
        >
          Transfer
        </button>
      </div>

      {/* Modal Kirim Hadiah */}
      {showGiftModal && (
        <div
          className={`fixed inset-0 bg-black/0 flex items-center justify-center z-50 transition-all duration-300 ${
            animateGiftModal ? "bg-black/50" : "bg-black/0"
          }`}
          onClick={closeModals}
        >
          <div
            className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 transition-all duration-300 ${
              animateGiftModal
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold font-playfair-display">
                Scan QRIS
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p className="mb-4">Silakan pindai/unduh QRIS berikut:</p>
              <div className="bg-gray-100 p-4 rounded-md">
                <img src={qris} alt="QRIS" className="w-full" />
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={qris}
                download="QRIS-Rizki.png"
                className="flex-1 bg-coklat-petro text-white py-2 rounded text-center hover:bg-blue-600 transition-colors"
              >
                Unduh QRIS
              </a>
              <button
                onClick={closeModals}
                className="flex-1 bg-red-800 text-white py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Cashless */}
      {showCashlessModal && (
        <div
          className={`fixed inset-0 bg-black/0 flex items-center justify-center z-50 transition-all duration-300 ${
            animateCashlessModal ? "bg-black/50" : "bg-black/0"
          }`}
          onClick={closeModals}
        >
          <div
            className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 transition-all duration-300 ${
              animateCashlessModal
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold font-playfair-display">
                Transfer Bank
              </h3>
              <button
                onClick={closeModals}
                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center"
              >
                &times;
              </button>
            </div>

            {copyMessage && (
              <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-center transition-opacity duration-300">
                {copyMessage}
              </div>
            )}

            <div className="mb-4">
              <p className="mb-4">
                Anda dapat memberikan kado melalui rekening berikut:
              </p>
              <div className="space-y-4">
                <div className="bg-gray-100 sm:p-4 p-2 rounded-md">
                  <img src={bankLogo} alt="logo bank" className="sm:h-8 h-6" />
                  {/* <div className="flex items-center justify-between gap-x-2">
                    <p className="font-medium">Bank BNI</p>
                  </div> */}
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold">085 6515 074</p>
                    <button
                      onClick={() => copyToClipboard("0856515074")}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      Salin
                    </button>
                  </div>
                  <p>a.n. Rizki Ilda Pratama</p>
                </div>
              </div>
            </div>
            <button
              onClick={closeModals}
              className="w-full bg-red-800 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default WeddingGiftButton;
