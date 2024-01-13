console.log("Welcome To Spotify");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Songs/crush beautiful ost goblin part 4.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressBar = document.getElementById('myprogressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {songName: "Beautiful Goblin Ost By Crush", filePath: "Songs/crush beautiful ost goblin part 4.mp3", coverPath: "covers/1.jpg"},
    {songName: "You & Me (Coachella Ver) By Jennie", filePath: "Songs/JENNIE (BLACKPINK) - You & Me (Coachella Ver.).mp3", coverPath: "covers/2.jpg"},
    {songName: "The Astronaut By Jin", filePath: "Songs/JIN (BTS) - The Astronaut.mp3", coverPath: "covers/3.jpg"},
    {songName: "Yes Or No By Jungkook", filePath: "Songs/Jung Kook - Yes or No.mp3", coverPath: "covers/4.jpg"},
    {songName: "Please Don't Change By Jungkook", filePath: "Songs/Jungkook - Please Don t Change (feat. DJ Snake).mp3", coverPath: "covers/5.jpg"},
    {songName: "LALALA By Stray Kids", filePath: "Songs/Stray Kids - LALALALA.mp3", coverPath: "covers/6.jpg"},
    {songName: "Too Much By The Kid Laroi & Jungkook", filePath: "Songs/The_Kid_LAROI_&_JUNGKOOK_BTS_&_Central_Cee_TOO_MUCH.mp3", coverPath: "covers/7.jpg"},
]


//audioElement.play();
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})

// Handle Play/Pause Click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = index; // Use index directly
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    updateSong();
});

document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    updateSong();
});

function updateSong() {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}
