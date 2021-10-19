import React from 'react';
import SimpleMenu from '../SimpleMenu';

const ContextMenu = ({ref}) => {

    const [visible, setVisible] = React.useState(false);
    const [position, setPosition] = React.useState({x:0, y:0})

    React.useEffect(()=>{
        let rightClick = document.addEventListener("contextmenu", (event) => {
            //console.log(event)
            event.preventDefault();
            const x = event.screenX + "px";
            const y = 'calc('+event.screenY + "px - 6em)";
            setPosition({x,y})
            setVisible(true);
        });
        let leftClick = document.addEventListener("click", (event) => {
            //console.log(event)
            //event.preventDefault();
            //const x = event.screenX + "px";
            //const y = event.screenY + "px";
            //setPosition({x,y})
            setVisible(false);
        });
        return (()=>{
            window.removeEventListener('contextmenu', rightClick, true);
            window.removeEventListener('click', leftClick, true);
        })
        /*if (ref && ref.current) {
            scroller.current.addEventListener("contextmenu", ()=>{

            }, false);
            return function cleanup() {
                 scroller.current.removeEventListener("contextmenu", ()=>, false);
            };
        }*/
    },[ref])

    return (
        <React.fragment>
            <div style={{position:'fixed', left:position.x, top:position.y, display:visible?'block':'none', zIndex: 1000}}>
                <SimpleMenu
                    open={visible}
                />
            </div>
        </React.fragment>
    )
}

export default ContextMenu;