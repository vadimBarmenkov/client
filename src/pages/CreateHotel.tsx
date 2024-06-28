import {DragEvent, FC, useState} from "react";
import {IImgCard} from "../types/types";
import {BiCloudUpload, BiTrash} from "react-icons/bi";
import {HotelService} from "../services/hotel.service";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import {Button} from "@material-tailwind/react";
import {FileService} from "../services/file.service";

const CreateHotel: FC = () => {

    const [newHotel, setNewHotel] = useState<{ title: string, description: string }>({title: '', description: ''});
    const [imgCardList, setImgCardList] = useState<IImgCard[]>([]);
    const [currentImgCard, setCurrentImgCard] = useState<IImgCard>();
    const [limitFlag, setLimitFlag] = useState(true);
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    function dargStartHandler(_e: DragEvent<HTMLDivElement>, card: IImgCard) {
        setCurrentImgCard(card);
    }

    function dargLeaveHandler(_e: DragEvent<HTMLDivElement>) {

    }

    function dargEndHandler(_e: DragEvent<HTMLDivElement>) {

    }

    function dargOverHandler(e: DragEvent<HTMLDivElement>) {
        e.preventDefault();

    }

    function dropHandler(e: DragEvent<HTMLDivElement>, card: IImgCard) {
        e.preventDefault();

        setImgCardList(imgCardList.map<any>(c => {
            if (c.id === card.id) {
                return {...c, order: currentImgCard?.order}

            }
            if (c.id === currentImgCard?.id) {
                return {...c, order: card.order}
            }

            return c;
        }))
    }

    const sortCard = (a: { order: number; }, b: { order: number; }) => {
        if (a.order > b.order) {
            return 1
        } else {
            return -1
        }
    }

    async function inputFile(e: { preventDefault: () => void; target: { files: any; }; }) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('img', e.target.files[0]);

        const data = await FileService.uploadImg(formData);
        const url = "http://localhost:5000/api/file/" + data.src;

        setImgCardList([...imgCardList, {id: Date.now(), order: imgCardList.length, src: url}]);

        setIsLoading(false);

        if (imgCardList.length > 8)
            setLimitFlag(false);

    }

    const sortImgByOrder = (array: any[]) => {
        const result = array.sort((a, b) => a.order > b.order ? 1 : -1);

        return result;
    }

    async function onSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        const images = sortImgByOrder(imgCardList).map(card => card.src);


        try {
            e.preventDefault();
            console.log(newHotel);
            const data = await HotelService.create({...newHotel, images: images});
            if (data) {
                toast.success("Запись успешно создана");
                navigate(`../hotels/${data._id}`);
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }

    }


    return (
        <div className="mt-10 flex flex-col justify-center items-center bg-white text-black">
            <form onSubmit={onSubmit} className="flex w-2/3 flex-col mx-auto gap-5">

                <div className="grid gap-x-8 gap-y-4 grid-cols-3">
                    {imgCardList.sort(sortCard).map(card =>
                        <div
                            onDragStart={(e) => dargStartHandler(e, card)}
                            onDragLeave={(e) => dargLeaveHandler(e)}
                            onDragEnd={(e) => dargEndHandler(e)}
                            onDragOver={(e) => dargOverHandler(e)}
                            onDrop={(e) => dropHandler(e, card)}
                            draggable={true}
                        >
                            <div className="relative">
                                {
                                    <img
                                        className="h-64 w-full rounded-lg object-cover object-center"
                                        src={card.src}
                                    />
                                }
                                <div className="absolute top-0 right-0">
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            FileService.deleteImg(card.src);
                                            setImgCardList(imgCardList.filter((imgCard) => imgCard !== card));
                                            setLimitFlag(true);
                                        }
                                        }>
                                        <BiTrash className="w-4 h-4" aria-hidden="true" fill="currentColor"
                                                 viewBox="0 0 21 21"/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                    {limitFlag && (
                        <div className="flex items-center justify-center w-full">
                            <label
                                className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <BiCloudUpload className="w-4 h-4" viewBox="0 0 21 21"/>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                        className="font-semibold">Click to upload</span></p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or
                                        GIF <br/> (MAX. 800x400px)</p>
                                </div>
                                <input onChange={inputFile} id="dropzone-file" type="file" className="hidden"/>
                            </label>
                        </div>
                    )}
                </div>

                <input onChange={(e) => setNewHotel({...newHotel, title: e.target.value})} value={newHotel.title}
                       type="text" className="input" placeholder="Название отеля"/>
                <textarea onChange={(e) => setNewHotel({...newHotel, description: e.target.value})}
                          value={newHotel.description} rows={6} className="input" placeholder="Описание"/>
                <Button className="text-center items-center w-64" type="submit" loading={isLoading}>
                    Создать
                </Button>

            </form>
        </div>
    );
};

export default CreateHotel;