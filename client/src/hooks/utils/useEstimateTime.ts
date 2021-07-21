const useEstimateTime = (trackCount: number | undefined) => {
  const averageTrackLength = 3 * 60 + 3;

  if (trackCount) {
    return Math.round((averageTrackLength * trackCount) / 3600);
  }

  return 0;
};

export default useEstimateTime;
