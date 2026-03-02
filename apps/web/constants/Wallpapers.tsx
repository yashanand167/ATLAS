export type Wallpaper = {
    id: string;
    name: string;
    src: string;
};

export const WALLPAPERS: Wallpaper[] = [
    {
        id: 'default',
        name: 'Default',
        src: 'https://i.pinimg.com/736x/ec/3b/8e/ec3b8eac7e5f946d6a5d5114a0cf4f21.jpg',
    },
    {
        id: 'abstract',
        name: 'Abstract',
        src: 'https://i.pinimg.com/736x/88/a8/5e/88a85ef78f90ddc1da0e6f96e76ca773.jpg',
    },
    {
        id: 'nature',
        name: 'Nature',
        src: 'https://i.pinimg.com/1200x/a6/bd/4d/a6bd4db7ee7053689bd971b36cbcd1ef.jpg',
    },
    {
        id: 'space',
        name: 'Space',
        src: 'https://i.pinimg.com/1200x/dd/22/b8/dd22b8115f3d47d22fa3e991df91a40f.jpg',
    }
];