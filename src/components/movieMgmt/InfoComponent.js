import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Chip, Input, InputAdornment, MenuItem, OutlinedInput, Select, TextField, styled } from '@mui/material';
import { getGenre, getMovieInfo, updateMovie } from '../../api/admin/movieMgmtApi';
import { dateFormat, today } from '../../util/Util';
import useCustomMove from '../../hooks/admin/useCustomMove';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const initState = {
    name: "",
    director: "",
    genres: [],
    actor: [],
    start: "",
    end: "",
    uploadThumbnail: "",
    age: 0,
    intro: "",
    thumbnail: "",
    seq: 0
}

const initGenre = [
    {
        code: 0,
        name: ""
    }
]

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const initError = {
    name: false,
    director: false,
    genres: false,
    actor: false,
    start: today(),
    end: today(),
    uploadThumbnail: false,
    age: false,
    intro: false
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        },
    },
};

function InfoComponent() {
    const { refresh, moveToMovieMgmtList } = useCustomMove();
    const [movie, setMovie] = useState(initState);
    const [genre, setGenre] = React.useState([]);
    const [actorInput, setActorInput] = React.useState([]);
    const [error, setError] = React.useState(initError);
    const { seq } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        getMovieInfo(seq)
            .then(result => {
                const movice2 = result.data;
                setMovie({ ...movice2 });

                var node = null;
                movice2.actor.forEach(data => {
                    var num = 0;

                    if (actorInput.length === 0) {
                        node = <>
                            <Input
                                id={`${num}_actor`}
                                name="actor"
                                value={data}
                                error={error.actor}
                                onChange={handelMovie}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <AddIcon onClick={handelAddActor} />
                                    </InputAdornment>
                                }
                            /><br /></>
                    } else {
                        node = <>
                            <Input
                                id={`${actorInput.length}_actor`}
                                name="actor"
                                value={data}
                                error={error.actor}
                                onChange={handelMovie}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <RemoveIcon onClick={() => handelRemoveActor(`${actorInput.length}`)} />
                                    </InputAdornment>
                                }
                            /><br /></>
                    }

                    setActorInput([...actorInput, node]);
                    num++;
                })
            });

        getGenre()
            .then(result => {
                if (result.code === 200) {
                    const genre2 = result.data;
                    setGenre(genre2)
                }
            })
    }, [seq]);

    const handelAddActor = () => {
        var node = null;

        setActorInput(prev => {
            console.log(prev.length);
            node = <>
                <Input
                    id={`${prev.length}_actor`}
                    name="actor"
                    error={error.actor}
                    onChange={handelMovie}
                    endAdornment={
                        <InputAdornment position="end">
                            <RemoveIcon onClick={() => handelRemoveActor(`${prev.length}`)} />
                        </InputAdornment>
                    }
                /><br /></>

            return [...prev, node];
        });
    }

    const handelRemoveActor = (seq) => {
        console.log(seq);
        setActorInput(prev => {
            console.log(prev);
           // return prev.filter(data => data.props.children[0].props.id !== `${seq}_actor`);
        })
    }

    const handelMovie = (e) => {
        if (e.target.name !== "actor") {
            if (e.target.name === "uploadThumbnail") {
                const file = e.target.files[0];
                movie[e.target.name] = file;
                setMovie({ ...movie });

                if (file) {
                    const img = document.getElementById("uploadThumbnail");
                    const reader = new FileReader();

                    reader.onload = () => {
                        img.src = reader.result;
                    };

                    reader.readAsDataURL(file);
                }
            } else {
                movie[e.target.name] = e.target.value;
                setMovie({ ...movie });
            }
        }
    }

    const handleMove = (path) => {
        navigator(path);
    }

    const handleSubmit = () => {
        updateMovie(movie)
            .then(result => {
                if (result.code === 200) {
                    alert("영화가 수정되었습니다.");
                    navigator(`/admin/movie/info/${seq}`);
                } else {
                    alert("데이터를 다시 확인해 주세요.");
                }
            });
    }

    const handleGenre = (event) => {
        const {
            target: { value },
        } = event;

        setMovie({ ...movie, genres: typeof value === "string" ? value.split(",") : value });
    };

    const handelMovieDate = (date, target) => {
        movie[target] = dateFormat(date.$d);
        setMovie({ ...movie });

        if (target === "start") {
            movie["end"] = dateFormat(date.$d);
            setMovie({ ...movie });
        }
    }

    return (
        <div>
            <div className="add-content">
                <div className="data">
                    <div className="key">이름</div>
                    <div className="value">
                        <Input fullWidth name="name" value={movie.name} onChange={handelMovie} error={error.name} />
                    </div>
                </div>
                <div className="data">
                    <div className="key">장르</div>
                    <div className="value">
                        <Select
                            labelId="demo-multiple-chip-label"
                            id="demo-multiple-chip"
                            multiple
                            name="genres"
                            value={movie.genres}
                            onChange={handleGenre}
                            input={<OutlinedInput id="select-multiple-chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {genre.length > 0 && (
                                        selected.map((value) => (
                                            <Chip key={value} label={genre.filter(data => data.code === value)[0].name} />
                                        ))
                                    )}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {
                                genre.length > 0 && (
                                    genre.map((row) => (
                                        <MenuItem value={parseInt(`${row.code}`)}>{row.name}</MenuItem >
                                    ))
                                )
                            }
                        </Select>
                    </div>
                </div>
                <div className="data">
                    <div className="key">감독</div>
                    <div className="value">
                        <Input name="director" value={movie.director} onChange={handelMovie} error={error.director} />
                    </div>
                </div>
                <div className="data">
                    <div className="key">배우</div>
                    <div className="value">
                        <div>
                            {actorInput}
                        </div>
                    </div>
                </div>
                <div className="data">
                    <div className="key">소개</div>
                    <div className="value">
                        <TextField
                            fullWidth
                            name="intro"
                            value={movie.intro}
                            multiline
                            rows={4}
                            error={error.intro}
                            onChange={handelMovie}
                        />
                    </div>
                </div>
                <div className="data">
                    <div className="key">상영기간</div>
                    <div className="value">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker
                                    value={dayjs(movie.start)}
                                    onChange={(date) => handelMovieDate(date, "start")}
                                    format="YYYY-MM-DD"
                                    minDate={dayjs(movie.start)}
                                    name="start"
                                />
                                <div>~</div>
                                <DatePicker
                                    value={dayjs(movie.end)}
                                    onChange={(date) => handelMovieDate(date, "end")}
                                    format="YYYY-MM-DD"
                                    minDate={dayjs(movie.start)}
                                    name="end"
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className="data">
                    <div className="key">이미지</div>
                    <div className="value" style={{ display: "-webkit-inline-box" }}>
                        <div style={{ marginRight: "1%" }}>
                            <img id="uploadThumbnail" src={`/upload/` + movie.thumbnail[0]} width={'300px'} height={'300px'}></img>
                        </div>
                        <div style={{ marginBlock: "auto" }}>
                            <Button
                                sx={{ backgroundColor: "#4AD9A4", color: "black" }}
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload file
                                <VisuallyHiddenInput type="file" name="uploadThumbnail" onChange={handelMovie} />
                            </Button>
                            {error.uploadThumbnail ?
                                <p style={{ color: "red", fontWeight: "700" }}>* 이미지를 확인해주세요.</p> : <></>
                            }

                        </div>

                    </div>
                </div>
                <div className="data">
                    <div className="key">관람가능나이</div>
                    <div className="value">
                        <Select name="age" value={movie.age} onChange={handelMovie}>
                            <MenuItem value={0}>전체</MenuItem >
                            <MenuItem value={15}>15세이상관람가</MenuItem >
                            <MenuItem value={19}>19세이상관람가</MenuItem >
                        </Select>
                    </div>
                </div>
            </div>

            <div className="add-btn">
                <Button variant="contained" color="success" sx={{ backgroundColor: "#4AD9A4", color: "black" }} onClick={handleSubmit}>
                    등록
                </Button>
                <Button variant="contained" sx={{ color: "black", backgroundColor: "#ced4da" }} onClick={moveToMovieMgmtList}>
                    취소
                </Button>
            </div>
        </div>
    )
}

export default InfoComponent