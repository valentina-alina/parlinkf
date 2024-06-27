import { EventContentArg } from '@fullcalendar/core';

interface RenderEventContentProps {
    eventInfo: EventContentArg;
}

export default function RenderEventContent({ eventInfo }: RenderEventContentProps) {
    const { event } = eventInfo;

    const startTime = event.start ? new Date(event.start) : null;
    const formattedTime = startTime ? `${startTime.getHours()}h${startTime.getMinutes().toString().padStart(2, '0')}` : '';

    return (
        <span className='flex flex-col text-xs text-white w-72 py-1 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-orange-400 relative inline-block my-2'>
            <span className='relative text-white flex flex-col'>
                <b>{formattedTime}</b>
                <i className="truncate break-all sm:break-normal w-28 sm:w-full">{event?.title}</i>
            </span>
        </span>
    );
}