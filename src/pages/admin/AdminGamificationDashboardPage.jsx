import React, { useEffect, useState } from "react";
import RankingTable from "../../components/gamification/RankingTable";
import LevelCarousel from "../../components/gamification/LevelCarousel";
import WorkerGamificationModal from "../../components/gamification/WorkerGamificationModal";
import useGamificationStore from "../../store/useGamificationStore";
import { toast } from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const AdminGamificationDashboardPage = () => {
  const {
    ranking,
    levels,
    loadGamificationRanking,
    loadGamificationLevels,
    getEmployeeGamificationStats,
    loading,
  } = useGamificationStore();

  const [selectedWorker, setSelectedWorker] = useState(null);
  const [workerStats, setWorkerStats] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          loadGamificationRanking(),
          loadGamificationLevels(),
        ]);
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [loadGamificationRanking, loadGamificationLevels]);

  const handleRowClick = async (worker) => {
    setSelectedWorker(worker);
    setModalOpen(true);
    try {
      const stats = await getEmployeeGamificationStats(worker.id);
      setWorkerStats(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Could not load worker stats");
      setModalOpen(false);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedWorker(null);
    setWorkerStats(null);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress size={60} color="primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <LevelCarousel levels={levels} />
      <RankingTable ranking={ranking} onRowClick={handleRowClick} />

      <WorkerGamificationModal
        open={modalOpen}
        onClose={handleClose}
        worker={selectedWorker}
        stats={workerStats}
      />
    </div>
  );
};

export default AdminGamificationDashboardPage;
