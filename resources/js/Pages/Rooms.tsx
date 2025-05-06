import InputError from "@/Components/InputError";
import Navbar from "@/Components/Navbar";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PageProps } from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function Rooms() {
    const { rooms } = usePage<PageProps<{ rooms: Room[] }>>().props;
    const { toast } = useToast();
    const [editedRoom, setEditedRoom] = useState<Room | null>(null);

    const {
        data,
        setData,
        post,
        delete: destroy,
        errors,
        processing,
        reset,
    } = useForm<{
        name: string;
        file: File | null;
    }>({
        name: "",
        file: null,
    });

    useEffect(() => {
        if (editedRoom) {
            setData({
                name: editedRoom.name,
                file: null,
            });
        }
    }, [editedRoom]);

    const handleAdd = (e: FormEvent) => {
        e.preventDefault();
        if (!!editedRoom) {
            post(route("room.update", editedRoom?.id), {
                onFinish: () => {
                    toast({
                        title: `${editedRoom.name} updated`,
                        description: `Ruangan ${editedRoom.name} berhasil diperbarui.`,
                    });
                    setEditedRoom(null);
                    reset("name");
                    reset("file");
                },
            });
        } else {
            post(route("room.store"), {
                onFinish: () => {
                    toast({
                        title: `${data.name} added`,
                        description: `Ruangan ${data.name} berhasil ditambahkan.`,
                    });
                    reset("name");
                    reset("file");
                },
            });
        }
    };

    const handleDelete = (id: number, room: string) => {
        destroy(route("room.destroy", id.toString()), {
            onFinish: () => {
                toast({
                    title: `${room} deleted`,
                    description: `${room} berhasil dihapus.`,
                });
            },
        });
    };

    return (
        <>
            <Head title="Rooms" />
            <Navbar />
            <div className="mt-20 container mx-auto">
                <Card className="w-full max-w-8xl mx-auto">
                    <CardHeader>
                        <CardTitle>
                            {!!editedRoom ? "Edit" : "Add"} Ruangan
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleAdd}
                            className="flex flex-col mb-4  max-w-80"
                            encType="multipart/form-data"
                        >
                            <div className="mb-4">
                                <Label htmlFor="picture">Ruangan</Label>
                                <Input
                                    type="text"
                                    placeholder="Nama Ruangan"
                                    required
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    className="flex-grow"
                                />
                            </div>
                            <div className="mb-4">
                                <Label htmlFor="picture">Upload</Label>
                                <Input
                                    id="picture"
                                    type="file"
                                    name="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            setData("file", e.target.files[0]);
                                        }
                                    }}
                                />
                                <InputError
                                    message={errors.file}
                                    className="mt-2"
                                />
                            </div>
                            <div className="flex justify-end items-center space-x-4">
                                <Button variant="secondary">Batal</Button>
                                <Button type="submit" disabled={processing}>
                                    <Plus className="h-4 w-4" />
                                    <span className="ml-2">
                                        {!!editedRoom ? "Edit" : "Add"}
                                    </span>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardHeader>
                        <CardTitle>Daftar Ruangan</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {rooms.length === 0 && (
                            <p className="text-center">Tidak ada ruangan</p>
                        )}
                        {rooms.map((room) => (
                            <Card
                                key={room.id}
                                className="flex flex-col overflow-hidden"
                            >
                                <div
                                    className="aspect-w-1 aspect-h-1 w-full relative transition-all overflow-hidden hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${room.image})`,
                                        height: "200px",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                ></div>
                                <CardContent className="p-4 flex-grow">
                                    <h2 className="text-lg font-semibold mb-2">
                                        {room.name}
                                    </h2>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 mt-auto">
                                    <div className="flex w-full space-x-2">
                                        <Button
                                            className="flex-1 bg-green-700"
                                            onClick={() => setEditedRoom(room)}
                                        >
                                            <Pencil className="h-4 w-4" />
                                            Edit
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button className="flex-1 bg-red-600">
                                                    <Trash2 className="h-4 w-4" />
                                                    Hapus
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Apakah kamu yakin?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Tindakan ini tidak dapat
                                                        dibatalkan. Ini akan
                                                        menghapus ruangan "
                                                        {room.name}" secara
                                                        permanen dan
                                                        menghapusnya dari server
                                                        kami.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Batal
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            handleDelete(
                                                                room.id,
                                                                room.name
                                                            )
                                                        }
                                                    >
                                                        Hapus
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
