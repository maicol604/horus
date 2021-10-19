//import "./styles.css";
import React from "react";
import ResizeObserver from "resize-observer-polyfill";
import { AnimatePresence } from "framer-motion";
import {ToggleLayer} from "react-laag";
/**
 * Icons
**/
import  Image  from "@mui/icons-material/EditOutlined";
import Video  from "@mui/icons-material/EditOutlined";
/**
 * Components
**/
import Button from "./Button";
import Menu from "./Menu";
/**
 * Main
**/

const CircularMemu = () => {
  return (
    <div>
      <ToggleLayer
        ResizeObserver={ResizeObserver}
        placement={{
          anchor: "CENTER"
        }}
        renderLayer={({ isOpen, layerProps, close }) => {
          return (
            <AnimatePresence>
              {isOpen && (
                <Menu
                  {...layerProps}
                  close={close}
                  items={[
                    { Icon: Image, value: "image", label: "Image" },
                    { Icon: Video, value: "video", label: "Video" },
                  ]}
                />
              )}
            </AnimatePresence>
          );
        }}
      >
        {({ triggerRef, toggle, isOpen }) => (
          <Button ref={triggerRef} onClick={toggle} isOpen={isOpen} />
        )}
      </ToggleLayer>
    </div>
  );
}

export default CircularMemu;
