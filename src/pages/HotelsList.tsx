import {FC, SetStateAction, useEffect, useMemo, useState} from "react";
import {HotelCard} from "../components/HotelCard";
import {IResponseHotelData} from "../types/types";
import {Button, IconButton, Spinner} from "@material-tailwind/react";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";
import {HotelService} from "../services/hotel.service";

const HotelsList: FC = () => {

    const [hotels, setHotels] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [active, setActive] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [pageButton, setPageButton] = useState<any[]>([]);

    async function fetchHotels() {
        setIsLoading(true);
        const response = await HotelService.getHotels(10, (active - 1) * 10);
        setHotels(response.data);
        setPageCount(Math.ceil(response.headers['x-total-count'] / 10));
        setPageButton([]);
        for (let i = 0; i < pageCount; i++) {
            setPageButton([pageButton, <IconButton {...getItemProps(i + 1)}>{i + 1}</IconButton>])
        }
        setIsLoading(false);
    }

    const getPagesArray = (pageCount: number) => {
        let array = [];
        for (let i = 0; i < pageCount; i++)
            array.push(i + 1);

        return array;
    }

    const pageArray = useMemo<number[]>(() => getPagesArray(pageCount), [pageCount]);

    useEffect(() => {
        fetchHotels();
    }, [active]);

    const getItemProps = (index: SetStateAction<number>) =>
        ({
            variant: active === index ? "filled" : "text",
            color: "gray",
            onClick: () => setActive(index),
        } as any);

    const next = () => {
        if (active === pageCount) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <div className="mt-10 flex flex-col justify-center items-center bg-slate-900 text-black">
            {isLoading
                ? <Spinner className="h-16 w-16 text-gray-900/50"/>
                :
                <div>
                    {
                        hotels.map((hotel: IResponseHotelData) =>
                            <HotelCard
                                key={hotel._id}
                                images={hotel.images}
                                title={hotel.title}
                                description={hotel.description}
                                _id={hotel._id}
                            />)
                    }

                    {pageCount > 1 && <div className="flex items-center justify-center gap-4 mt-4">
                        <Button
                            variant="text"
                            className="flex items-center gap-2"
                            onClick={prev}
                            disabled={active === 1}
                        >
                            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4"/>
                        </Button>
                        <div className="flex items-center gap-2">
                            {pageArray.map((page) => <IconButton
                                key={page} {...getItemProps(page)}>{page}</IconButton>)}
                        </div>
                        <Button
                            variant="text"
                            className="flex items-center gap-2"
                            onClick={next}
                            disabled={active === pageCount}
                        >
                            <ArrowRightIcon strokeWidth={2} className="h-4 w-4"/>
                        </Button>
                    </div>}
                </div>
            }
        </div>

    );
};

export default HotelsList;