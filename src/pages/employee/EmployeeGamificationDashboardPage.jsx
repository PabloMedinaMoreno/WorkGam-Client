// src/pages/gamification/EmployeeGamificationDashboardPage.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import RankingTable from "../../components/gamification/RankingTable";
import LevelCarousel from "../../components/gamification/LevelCarousel";
import EmployeeLevelProgressCard from "../../components/gamification/EmployeeLevelProgressCard";
import useGamificationStore from "../../store/useGamificationStore";

const EmployeeGamificationDashboardPage = () => {
  const {
    ranking,
    levels,
    levelProgression,
    loadLevelProgression,
    loadGamificationRanking,
    loadGamificationLevels,
  } = useGamificationStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          loadGamificationRanking(),
          loadGamificationLevels(),
          loadLevelProgression(),
        ]);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, [
    loadGamificationRanking,
    loadGamificationLevels,
    loadLevelProgression,
  ]);

  return (
    <div className="p-8">
      {/* Level Carousel */}
      <LevelCarousel levels={levels} />

      {/* Card de Progreso de Nivel con imágenes y XP ampliados */}
      <div className="mb-10">
        <EmployeeLevelProgressCard
          levelProgression={levelProgression}
        />
      </div>

      {/* Ranking */}
      <RankingTable ranking={ranking} />
    </div>
  );
};

export default EmployeeGamificationDashboardPage;
