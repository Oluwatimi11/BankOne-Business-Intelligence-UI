import { AbsoluteContainer, AppLabel, AppText, Circle, CustomContainer, FlexRow } from "@/style"
import Image from "next/image";
import OddSpiral from '@/assets/images/card-spiral-odd.svg'
import EvenSpiral from '@/assets/images/card-spiral-even.svg'
import CustomerIcon from '@/assets/images/customer-icon-new.svg'
import AccountIcon from '@/assets/images/account-icon-new.svg'
import DepositIcon from '@/assets/images/deposit-icon-new.svg'
import LoanIcon from '@/assets/images/loan-icon-new.svg'
import { moneyFormat } from "@/utilities/utility"


export const StatisticsCard: React.FC<any> = ({ customerOverview, loanOverview, accountOverview, fixedDepositOverview, fixedDepositBalance }) => {
    return (
        <CustomContainer className='horizontal-scroll-container' $topMargin={'2'} $overflow={'auto'}>
            <CustomContainer style={{ minWidth: 'fit-content' }} >
                <FlexRow $gap={'2'}>
                    <CustomContainer
                        $width={'32'} $minHeight={'17.9'} $radius={'0.8'} $bgColor={'#111111'}
                        $shadow={'0px 10px 30px rgba(0, 0, 0, 0.1)'} $padding={'2'}
                        $topPadding={'2'} $bottomPadding={'1'}
                        className='statistics-card'
                    >
                        <AbsoluteContainer $top={'0'} $left={'0'}>
                            <Image src={OddSpiral} alt="Odd Spiral Icon" width={24} height={24} />
                        </AbsoluteContainer>
                        <AbsoluteContainer $top={'1.7'} $right={'1.7'}>
                            {/* <Circle size="4.4" bgColor='#1A460D'>
                                <Circle size='3' bgColor='#60BB46'>
                                    <CustomerIcon />
                                </Circle>
                            </Circle> */}
                            <Image src={CustomerIcon} alt="Customer Icon" width={24} height={24} />
                        </AbsoluteContainer>
                        <CustomContainer>
                            <AppLabel $textSize={'1.6'} $color={'#ffffff'}>Customers</AppLabel>
                            <AppText $textSize={'2.5'} $fontWeight={'700'} $color={'#ffffff'}>{moneyFormat(customerOverview?.TotalCustomers || 0)}</AppText>
                        </CustomContainer>
                        <FlexRow $wrap={'wrap'} $gap={'3'} $topMargin={'2.7'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $bottomMargin={'0.7'}>
                                    <Circle $size={'0.5'} $bgColor={'#60BB46'} $rightMargin={'0.5'} />
                                    <AppText $color={'#ffffff'}>Monthly Active</AppText>
                                </FlexRow>
                                <AppText $fontWeight={'700'} $color={'#ffffff'} $leftMargin={'1'}>{moneyFormat(customerOverview?.ActiveCustomers || 0)}</AppText>
                            </CustomContainer>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $bottomMargin={'0.7'}>
                                    <Circle $size={'0.5'} $bgColor={'#C4C4C4'} $rightMargin={'0.5'} />
                                    <AppText $color={'#ffffff'}>Monthly Inactive</AppText>
                                </FlexRow>
                                <AppText $fontWeight={'700'} $color={'#ffffff'} $leftMargin={'1'}>{moneyFormat(customerOverview?.InactiveCustomers || 0)}</AppText>
                            </CustomContainer>
                        </FlexRow>
                    </CustomContainer>

                    <CustomContainer
                        $width={'32'} $minHeight={'17.9'} $radius={'0.8'} $bgColor={'#111111'}
                        $shadow={'0px 10px 30px rgba(0, 0, 0, 0.1)'} $padding={'2'}
                        $topPadding={'2'} $bottomPadding={'1'}
                        className='statistics-card'
                    >
                        <AbsoluteContainer $top={'0'} $right={'0'}>
                            <Image src={EvenSpiral} alt="Even Spiral Icon" width={24} height={24} />

                        </AbsoluteContainer>
                        <AbsoluteContainer $top={'1.7'} $right={'1.7'}>
                            <Image src={LoanIcon} alt="Loan Icon" width={24} height={24} />

                        </AbsoluteContainer>
                        <CustomContainer>
                            <AppLabel $textSize={'1.6'} $color={'#ffffff'}>Loan Disbursed</AppLabel>
                            <AppText $textSize={'2.5'} $fontWeight={'700'} $color={'#ffffff'}>N{moneyFormat(loanOverview?.DisbursedLoansAmount || 0)}</AppText>
                        </CustomContainer>
                        <FlexRow $wrap={'wrap'} $gap={'2'} $topMargin={'2.7'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <AppText $color={'#ffffff'} $bottomMargin={'0.7'}>No. of Disbursed Loans</AppText>
                                <AppText $fontWeight={'700'} $color={'#ffffff'}>{moneyFormat(loanOverview?.DisbursedLoansCount || 0)}</AppText>
                            </CustomContainer>
                        </FlexRow>
                    </CustomContainer>

                    <CustomContainer
                        $width={'32'} $minHeight={'17.9'} $radius={'0.8'} $bgColor={'#111111'}
                        $shadow={'0px 10px 30px rgba(0, 0, 0, 0.1)'} $padding={'2'}
                        $topPadding={'2'} $bottomPadding={'1'}
                        className='statistics-card'
                    >
                        <AbsoluteContainer $top={'0'} $left={'0'}>
                            <Image src={OddSpiral} alt="Odd Spiral Icon" width={24} height={24} />

                        </AbsoluteContainer>
                        <AbsoluteContainer $top={'1.7'} $right={'1.7'}>
                            <Image src={AccountIcon} alt="account Icon" width={24} height={24} />

                        </AbsoluteContainer>
                        <CustomContainer>
                            <AppLabel $textSize={'1.6'} $color={'#ffffff'}>Account holders</AppLabel>
                            <AppText $textSize={'2.5'} $fontWeight={'700'} $color={'#ffffff'}>{moneyFormat(accountOverview?.TotalAccounts || 0)}</AppText>
                        </CustomContainer>
                        <FlexRow $wrap={'wrap'} $gap={'3'} $topMargin={'2.7'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $bottomMargin={'0.7'}>
                                    <Circle $size={'0.5'} $bgColor={'#60BB46'} $rightMargin={'0.5'} />
                                    <AppText $color={'#ffffff'}>Monthly Active</AppText>
                                </FlexRow>
                                <AppText $fontWeight={'700'} $color={'#ffffff'} $leftMargin={'1'}>{moneyFormat(accountOverview?.ActiveAccounts || 0)}</AppText>
                            </CustomContainer>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <FlexRow $width={'auto'} $sizeUnit={''} $bottomMargin={'0.7'}>
                                    <Circle $size={'0.5'} $bgColor={'#C4C4C4'} $rightMargin={'0.5'} />
                                    <AppText $color={'#ffffff'}>Monthly Inactive</AppText>
                                </FlexRow>
                                <AppText $fontWeight={'700'} $color={'#ffffff'} $leftMargin={'1'}>{moneyFormat(accountOverview?.InactiveAccounts || 0)}</AppText>
                            </CustomContainer>
                        </FlexRow>
                    </CustomContainer>

                    <CustomContainer
                        $width={'32'} $minHeight={'17.9'} $radius={'0.8'} $bgColor={'#111111'}
                        $shadow={'0px 10px 30px rgba(0, 0, 0, 0.1)'} $padding={'2'}
                        $topPadding={'2'} $bottomPadding={'1'}
                        className='statistics-card'
                    >
                        <AbsoluteContainer $top={'0'} $right={'0'}>
                            <Image src={EvenSpiral} alt="even Spiral Icon" width={24} height={24} />

                        </AbsoluteContainer>
                        <AbsoluteContainer $top={'1.7'} $right={'1.7'}>
                            <Image src={DepositIcon} alt="deposit Icon" width={24} height={24} />

                        </AbsoluteContainer>
                        <CustomContainer>
                            <AppLabel $textSize={'1.6'} $color={'#ffffff'}>Fixed Deposits</AppLabel>
                            <AppText $textSize={'2.5'} $fontWeight={'700'} $color={'#ffffff'}>N{moneyFormat(fixedDepositBalance?.TotalBalance || 0)}</AppText>
                        </CustomContainer>
                        <FlexRow $wrap={'wrap'} $gap={'2'} $topMargin={'2.7'}>
                            <CustomContainer $width={'auto'} $sizeUnit={''}>
                                <AppText $color={'#ffffff'} $bottomMargin={'0.7'}>No. Of Fixed Deposits</AppText>
                                <AppText $fontWeight={'700'} $color={'#ffffff'}>{moneyFormat(fixedDepositOverview?.TotalFixedDeposits || 0)}</AppText>
                            </CustomContainer>
                        </FlexRow>
                    </CustomContainer>
                </FlexRow>
            </CustomContainer>
        </CustomContainer>
    )
}