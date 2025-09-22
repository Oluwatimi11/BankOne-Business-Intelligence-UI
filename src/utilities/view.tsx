import { AiOutlineExclamationCircle } from 'react-icons/ai'

export const explain = (text: string, mobileHide = false, topMargin = '-0.5', size = '1.7') => 
<AiOutlineExclamationCircle 
    style={{fontSize: `${size}rem`, marginLeft: '0.5rem', marginTop: `${topMargin}rem`, color: '#0D968F'}} 
    data-tip={text}
    className={mobileHide ? 'hide-tooltip' : ''}
    data-class="my-tooltip"
/> 