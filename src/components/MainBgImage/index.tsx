import { FixedContainer } from "@/style"
import MainBgImg1 from '@/assets/images/bankone-bi-bgI1.svg'
import MainBgImg2 from '@/assets/images/bankone-bi-bgI2.svg'

export const MainBgImage = () => {
    return (
        <>
            <FixedContainer $left={'0'} $top={'0'}>
                <MainBgImg1 />
            </FixedContainer>
            <FixedContainer $right={'0'} $top={'0'}>
                <MainBgImg2 />
            </FixedContainer>
        </>
    )
}