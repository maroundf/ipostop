"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (width, height, lightbg, blackcolor) {
    return {
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        watchOrigin: {
            position: "absolute",
            width: width,
            bottom: 20,
            justifyContent: "center",
            alignItems: "center"
        },
        watchOriginTouchable: {
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 30,
            borderColor: lightbg,
            borderWidth: 0.5,
            backgroundColor: "rgba(0, 0, 0, 0.1)"
        },
        watchOriginText: {
            color: lightbg,
            backgroundColor: "transparent"
        },
        moveBox: {
            flexDirection: "row",
            alignItems: "center"
        },
        menuContainer: {
            position: "absolute",
            width: width,
            height: height,
            left: 0,
            top: 0,
            zIndex: 9999
        },
        menuShadow: {
            position: "absolute",
            width: width,
            height: height,
            backgroundColor: blackcolor,
            left: 0,
            bottom: 0,
            opacity: 0.2,
            zIndex: 10
        },
        menuContent: {
            position: "absolute",
            width: width,
            left: 0,
            bottom: 0,
            zIndex: 11
        },
        operateContainer: {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: lightbg,
            height: 40
        },
        operateText: {
            color: blackcolor
        },
        loadingTouchable: {
            width: width,
            height: height
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        arrowLeftContainer: {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            justifyContent: "center"
        },
        arrowRightContainer: {
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            justifyContent: "center"
        }
    };
};
