export type ReadByVolumeByChannelResponse = {
  isSuccessful: boolean;
  data: {
    total_volume: number,
    channels: {
      InstitutionCode: string,
      Volume: number,
      Percentage: number,
      Channel: string,
      Duration: string
    }[];
  };
  message: string;
  code: number;
};
