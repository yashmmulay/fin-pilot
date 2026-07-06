import { useContext } from "react";

import {
    FaUser,
    FaEnvelope,
    FaShieldHalved,
    FaPen,
} from "react-icons/fa6";

import AuthContext from "../context/AuthContext";

function Profile() {

    const { user } = useContext(AuthContext);

    const initials = user?.fullName
        ?.split(" ")
        .map(name => name[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    return (

        <div className="mx-auto max-w-3xl">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    My Profile
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your FinPilot account information.
                </p>

            </div>

            {/* Card */}

            <div className="rounded-2xl border bg-white p-8 shadow-sm">

                <div className="mb-8 flex flex-col items-center">

                    <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-3xl font-bold text-white">

                        {initials}

                    </div>

                    <h2 className="text-2xl font-semibold">

                        {user?.fullName}

                    </h2>

                </div>

                <div className="space-y-6">

                    <div className="flex items-center gap-4 rounded-xl border p-4">

                        <FaUser
                            className="text-blue-600"
                            size={20}
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Full Name
                            </p>

                            <p className="font-medium">
                                {user?.fullName}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4 rounded-xl border p-4">

                        <FaEnvelope
                            className="text-blue-600"
                            size={20}
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="font-medium">
                                {user?.email}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-center gap-4 rounded-xl border p-4">

                        <FaShieldHalved
                            className="text-blue-600"
                            size={20}
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Role
                            </p>

                            <p className="font-medium capitalize">
                                {user?.role?.toLowerCase()}
                            </p>

                        </div>

                    </div>

                </div>

                <button
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-100 py-3 font-medium text-gray-700 transition hover:bg-gray-200"
                >

                    <FaPen />

                    Edit Profile (Coming Soon)

                </button>

            </div>

        </div>

    );

}

export default Profile;