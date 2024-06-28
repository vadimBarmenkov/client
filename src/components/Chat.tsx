import {Badge, Button, Card, CardBody, Collapse, IconButton, Input} from '@material-tailwind/react'
import {FC, useEffect, useState} from 'react'

interface Message {
    _id: string;
    author: string;
    text: string;
    sendAt: Date;
    readAt: Date | undefined;
}


export const Chat: FC = () => {

    const [open, setOpen] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            _id: '2132141534215',
            author: 'manager',
            text: 'Здравствуйте! Расскажите чем я могу вам помочь?',
            sendAt: new Date(),
            readAt: undefined
        }]);

    useEffect(() => {

    }, []);

    const toggleOpen = () => setOpen((cur) => !cur);

    const submitHandler = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setMessages([...messages, {
            _id: '23123',
            author: 'user',
            text: newMessage,
            sendAt: new Date(),
            readAt: undefined
        }]);
        setNewMessage('');
    }

    return (
        <div className='text-black'>
            <div className='fixed bottom-4 right-4'>
                <Badge content="5">
                    <Button
                        className='inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16 bg-black hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900'
                        onClick={toggleOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"/>
                        </svg>
                    </Button>
                </Badge>
            </div>


            <Collapse open={open}
                      className='fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white rounded-lg w-[440px] h-[634px]'>
                <Card className='border border-[#e5e7eb]'>
                    <CardBody>

                        <div className="flex flex-col space-y-1.5 pb-6">
                            <IconButton
                                type='button'
                                size="sm"
                                color="gray"
                                className="!absolute right-1 top-1 rounded-full"
                                onClick={toggleOpen}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                            </IconButton>
                            <h2 className="font-semibold text-lg tracking-tight">Поддержка</h2>
                        </div>

                        <div className="pr-4 h-[474px] w-full table">
                            <div className="space-y-4">
                                {messages.map((message) => {
                                    if (message.author === 'user') {
                                        return <div key={message._id} className="flex items-end justify-end">
                                            <div className="bg-blue-500 p-3 rounded-lg">
                                                <p className="text-sm text-white">{message.text}</p>
                                            </div>
                                        </div>
                                    } else {
                                        return <div key={message._id} className="flex items-start">
                                            <div className="ml-3 bg-gray-100 p-3 rounded-lg">
                                                <p className="text-sm text-gray-800">{message.text}</p>
                                            </div>
                                        </div>
                                    }
                                })}
                            </div>
                        </div>

                        <div className="flex items-center pt-0">
                            <form onSubmit={submitHandler}
                                  className="flex items-center justify-center w-full space-x-2">
                                <div className="relative flex w-full max-w-[24rem]">
                                    <Input
                                        type="text"
                                        label="Сообщение:"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="pr-20"
                                        containerProps={{
                                            className: "min-w-0",
                                        }}
                                        crossOrigin={undefined}
                                    />
                                    <IconButton
                                        type='submit'
                                        size="sm"
                                        color={newMessage ? "gray" : "blue-gray"}
                                        disabled={!newMessage}
                                        className="!absolute right-1 top-1 rounded"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"/>
                                        </svg>
                                    </IconButton>
                                </div>
                            </form>
                        </div>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
}