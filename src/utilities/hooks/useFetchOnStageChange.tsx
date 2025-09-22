import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";

const useFetchOnStageChange = () => {
    const appStage = useSelector((state: RootState) => state.base.appStage);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Example of calling multiple APIs based on the stage change
                await Promise.all([
                    // Add more API calls as needed
                ]);

                // Handle the fetched data
            } catch (error) {
                console.error("Error fetching data on stage change:", error);
            }
        };

        fetchData();
    }, [appStage]); // Fetch data whenever appStage or apiClient changes
};

export default useFetchOnStageChange;
