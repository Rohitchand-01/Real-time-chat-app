import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col gap-4 p-4 max-w-sm w-full mx-auto bg-white rounded-lg shadow-lg animate-pulse">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-300 rounded-full"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-indigo-300 rounded w-3/4"></div>
                    <div className="h-4 bg-indigo-300 rounded w-1/2"></div>
                </div>
            </div>
            <div className="h-48 bg-indigo-300 rounded-lg"></div>
            <div className="space-y-2">
                <div className="h-4 bg-indigo-300 rounded"></div>
                <div className="h-4 bg-indigo-300 rounded w-5/6"></div>
                <div className="h-4 bg-indigo-300 rounded w-2/3"></div>
            </div>
        </div>
    )
}

export default Loading
