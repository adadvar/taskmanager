import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";

const Calendar = ({ onCalendarChange, defaultValue }) => {
    const [value, setValue] = useState(defaultValue);
    const handleChange = (value) => {
        setValue(value);
        onCalendarChange(value.format("YYYY/MM/DD HH:mm:00"));
    };

    return (
        <DatePicker
            value={value}
            placeholder="تاریخ را واردکنید"
            style={{ width: "100%", height: "46px" }}
            format="YYYY/MM/DD HH:mm"
            onChange={handleChange}
            plugins={[<TimePicker hideSeconds style={{ minWidth: "200px" }} />]}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
        />
    );
};

export default Calendar;
