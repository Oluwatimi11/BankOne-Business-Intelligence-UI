import './style.scss'
import { GridContainer } from "@/style";
import Lottie from "lottie-react";
import loaderGif from "@/assets/gif/loader.json";

export const Loader: React.FC = () => {
    return (
        <div className="loader-container">
            <GridContainer $height={"100"} $hUnit={"%"} $bottomMargin={'10'}>
                <GridContainer $width={"20"} $sizeUnit={""}>
                    <Lottie animationData={loaderGif} loop={true} />
                </GridContainer>
            </GridContainer>
        </div>
    )
}