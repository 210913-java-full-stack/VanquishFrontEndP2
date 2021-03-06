import { Component, OnInit } from '@angular/core';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Playlist, Track } from 'src/app/interfaces/playlist';
import { PlaylistTrackService } from 'src/app/services/playlist-track.service';
import { PlaylistService } from 'src/app/services/playlist.service';
import { RatingService } from 'src/app/services/rating.service';
import { TrackService } from 'src/app/services/track.service';

@Component({
  selector: 'app-playlist-manager',
  templateUrl: './playlist-manager.component.html',
  styleUrls: ['./playlist-manager.component.css']
})
export class PlaylistManagerComponent implements OnInit {
  playlistName:String='';
  playlist_id:number=0;
  newPlaylist_id:number=0;
  tracklist:Track[]=[];
  newPlaylist:Playlist[]=[];
  resultPlaylist:Playlist[]=[];
  faThumbsUp=faThumbsUp;
  faThumbsDown=faThumbsDown;
  ratedTrack:Track[]=[];
  resultTracks:Track[]=[];

  constructor(private service:PlaylistService,
              private service2:PlaylistTrackService,
              private service4:RatingService) { }

  createPlaylist(playlistName:String):void{
    this.service.PostPlaylist({
      playlist_id:this.newPlaylist_id,
      playlistName:this.playlistName,
      tracklist:this.tracklist
  }).subscribe(list=>{
      let {playlist_id,playlistName,tracklist}=list;
      this.newPlaylist.push({playlist_id,playlistName,tracklist})
      console.log(list);
  })
    this.playlistName='';
    this.newPlaylist_id=0;
    this.tracklist=[];
}

  viewPlaylist(playlist_id:number):void{
    this.service.GetTracksFromPlaylist(playlist_id).subscribe(list=>{
      for(const track of list){
        let {track_id, title, artist, album} = track;
        this.tracklist.push({track_id, title, artist, album})
        console.log(this.tracklist);
      }
  });
    
}

  likeThis(track:Track):void{
    this.service4.likeTrack(track).subscribe(data=>{
        let {track_id, title, artist, album} = data;
        this.ratedTrack.push({track_id, title, artist, album});
        console.log(this.ratedTrack);
    });
  }
  dislikeThis(track:Track):void{
    this.service4.dislikeTrack(track).subscribe(data=>{
      let {track_id, title, artist, album} = data;
      this.ratedTrack.push({track_id, title, artist, album});
      console.log(this.ratedTrack);
  });
  }

  removeFromList(playlist_id:number,track_id:number):void{
    console.log(playlist_id);
    console.log(track_id);
    this.service2.RemoveFromPlaylist(playlist_id,track_id).subscribe(data=>{
      let {playlist_id, track_id} = data;
    })
    console.log("Done");
  }

  ngOnInit(): void {
  }

}
