
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';

const Center = (props: { moveMap: () => void}):JSX.Element => {
    return (
        <div 
            style = {{ width: '50px', height: '50px', backgroundColor: '#fff', border: '5px', cursor: 'pointer', position: 'absolute', right: '100px', bottom: '75px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            onClick = {props.moveMap}>
            <CenterFocusStrongIcon style = {{ width: '50px', height: '50px' }}/>
        </div>
    )
}

export default Center;