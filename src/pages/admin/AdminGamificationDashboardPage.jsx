// src/pages/gamification/AdminGamificationDashboardPage.jsx
import React, { useEffect, useState } from "react";
import RankingTable from "../../components/gamification/RankingTable";
import LevelCarousel from "../../components/gamification/LevelCarousel";
import WorkerGamificationModal from "../../components/gamification/WorkerGamificationModal";
import useGamificationStore from "../../store/useGamificationStore";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const AdminGamificationDashboardPage = () => {
  const { ranking, levels, loadGamificationRanking, loadGamificationLevels, loading } =
    useGamificationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          loadGamificationRanking(),
          loadGamificationLevels(),
        ]);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [loadGamificationRanking, loadGamificationLevels]);

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (worker) => {
    setSelectedWorker(worker);
    setModalOpen(true);
  };

  if (loading) {
    <CircularProgress />;
  }

  return (
    <div className="p-8">
      {/* Level Carousel */}
      <LevelCarousel levels={levels} />

      {/* Ranking */}
      <RankingTable ranking={ranking} onRowClick={handleRowClick} />

      {/* Worker Gamification Modal */}
      <WorkerGamificationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        worker={selectedWorker}
      />
    </div>
  );
};

export default AdminGamificationDashboardPage;
