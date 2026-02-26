export type Wallpaper = {
    id: string;
    name: string;
    src: string;
};

export const WALLPAPERS: Wallpaper[] = [
    {
        id: 'default',
        name: 'Default',
        src: '/wallpapers/default.jpg',
    },
    {
        id: 'abstract',
        name: 'Abstract',
        src: '/wallpapers/abstract.jpg',
    },
    {
        id: 'nature',
        name: 'Nature',
        src: '/wallpapers/nature.jpg',
    },
];