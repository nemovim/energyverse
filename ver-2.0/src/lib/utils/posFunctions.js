export function getPositionStyle(pos) {
        return `left:${pos[0] * 2.7 - 1.5}rem; top:${
            ((pos[1] - pos[2]) * 0.9 - 0.75) * 3 ** (1 / 2)
        }rem`;
    }