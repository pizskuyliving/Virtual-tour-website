import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import Footer from "@/Components/Footer";
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
import { PageProps } from "@/types/index";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function Dashboard() {
    const { rooms } = usePage<PageProps<{ rooms: Room[] }>>().props;
    const { toast } = useToast();
    const [editedRoom, setEditedRoom] = useState<Room | null>(null);
    // Changing the key remounts the form, which also clears the file inputs
    const [formKey, setFormKey] = useState(0);
    const {
        data,
        setData,
        post,
        delete: destroy,
        errors,
        processing,
        reset,
        clearErrors,
    } = useForm<{
        name: string;
        file: File | null;
        cover: File | null;
    }>({
        name: "",
        file: null,
        cover: null,
    });

    useEffect(() => {
        if (editedRoom) {
            setData({
                name: editedRoom.name,
                file: null,
                cover: null,
            });
        }
    }, [editedRoom]);

    const handleAdd = (e: FormEvent) => {
        e.preventDefault();
        if (!!editedRoom) {
            post(route("room.update", editedRoom?.id), {
                onSuccess: () => {
                    toast({
                        title: `${editedRoom.name} updated`,
                        description: `Ruangan ${editedRoom.name} berhasil diperbarui.`,
                    });
                    setEditedRoom(null);
                    reset();
                    setFormKey((key) => key + 1);
                },
            });
        } else {
            post(route("room.store"), {
                onSuccess: () => {
                    toast({
                        title: `${data.name} added`,
                        description: `Ruangan ${data.name} berhasil ditambahkan.`,
                    });
                    reset();
                    setFormKey((key) => key + 1);
                },
            });
        }
    };

    const handleCancel = () => {
        setEditedRoom(null);
        reset();
        clearErrors();
        setFormKey((key) => key + 1);
    };

    const handleMove = (id: number, direction: "up" | "down") => {
        router.post(
            route("room.move", id.toString()),
            { direction },
            { preserveScroll: true }
        );
    };

    const handleDelete = (id: number, room: string) => {
        destroy(route("room.destroy", id.toString()), {
            onSuccess: () => {
                toast({
                    title: `${room} deleted`,
                    description: `${room} berhasil dihapus.`,
                });
            },
        });
    };

    return (
        
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Dashboard
                    </h2>
                }
            >
                <Head title="Dashboard" />

                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <Card className="w-full max-w-8xl mx-auto">
                            <CardHeader>
                                <CardTitle>
                                    {!!editedRoom ? "Edit" : "Tambah"} Ruangan
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form
                                    key={formKey}
                                    onSubmit={handleAdd}
                                    className="flex flex-col mb-4  max-w-80"
                                    encType="multipart/form-data"
                                >
                                    <div className="mb-4">
                                        <Label htmlFor="name">Ruangan</Label>
                                        <Input
                                            id="name"
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
                                        <InputError
                                            message={errors.name}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="picture">
                                            Upload 3D Vista
                                        </Label>
                                        <Input
                                            id="picture"
                                            type="file"
                                            name="file"
                                            accept=".zip"
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    setData(
                                                        "file",
                                                        e.target.files[0]
                                                    );
                                                }
                                            }}
                                        />
                                        <InputError
                                            message={errors.file}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <Label htmlFor="cover">
                                            Upload Cover
                                        </Label>
                                        <Input
                                            id="cover"
                                            type="file"
                                            name="cover"
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    setData(
                                                        "cover",
                                                        e.target.files[0]
                                                    );
                                                }
                                            }}
                                        />
                                        <InputError
                                            message={errors.cover}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="flex justify-end items-center space-x-4">
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={handleCancel}
                                        >
                                            Batal
                                        </Button>
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span className="ml-2">
                                                {!!editedRoom
                                                    ? "Edit"
                                                    : "Tambah"}
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
                                    <p className="text-center">
                                        Tidak ada ruangan
                                    </p>
                                )}
                                {rooms.map((room, index) => (
                                    <Card
                                        key={room.id}
                                        className="flex flex-col overflow-hidden"
                                    >
                                        <div
                                            className="aspect-w-1 aspect-h-1 w-full relative transition-all overflow-hidden hover:scale-105"
                                            style={{
                                                backgroundImage: `url('${room.cover}')`,
                                                height: "200px",
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        ></div>
                                        <CardContent className="p-4 flex-grow">
                                            <div className="flex items-start justify-between gap-2">
                                                <h2 className="text-lg font-semibold mb-2">
                                                    {index + 1}. {room.name}
                                                </h2>
                                                <div className="flex shrink-0 gap-1">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        title="Pindah ke atas"
                                                        aria-label={`Pindahkan ${room.name} ke atas`}
                                                        disabled={index === 0}
                                                        onClick={() =>
                                                            handleMove(room.id, "up")
                                                        }
                                                    >
                                                        <ArrowUp className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        title="Pindah ke bawah"
                                                        aria-label={`Pindahkan ${room.name} ke bawah`}
                                                        disabled={index === rooms.length - 1}
                                                        onClick={() =>
                                                            handleMove(room.id, "down")
                                                        }
                                                    >
                                                        <ArrowDown className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0 mt-auto">
                                            <div className="flex w-full space-x-2">
                                                <Button
                                                    className="flex-1 bg-green-700"
                                                    onClick={() =>
                                                        setEditedRoom(room)
                                                    }
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
                                                                Apakah kamu
                                                                yakin?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Tindakan ini
                                                                tidak dapat
                                                                dibatalkan. Ini
                                                                akan menghapus
                                                                ruangan "
                                                                {room.name}"
                                                                secara permanen
                                                                dan menghapusnya
                                                                dari server
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
                </div>
            </AuthenticatedLayout>
            <Footer />
        </>
    );
}
