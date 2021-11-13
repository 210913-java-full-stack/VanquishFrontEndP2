export interface Playlist {
    playlist_id:number,
    playlistName:String,
    tracks:Array<Track>
}

export interface Track {
    track_id:number,
    title:String,
    artist:
    {
        ID:number,
        name:String,
        image_url:String
    },
    album:
    {
        ID:number,
        album_title:String,
        date:String,
        genre:
        {
            genre_id:number,
            genre_name:String,
            image_url:String
        }
    }
}
