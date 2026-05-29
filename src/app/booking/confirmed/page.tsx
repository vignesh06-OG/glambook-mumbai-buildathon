import { BookingConfirmedClient } from "@/components/BookingConfirmedClient";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BookingConfirmedPage({ searchParams }: Props) {
  const params = await searchParams;
  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v ?? "";
  };

  return (
    <BookingConfirmedClient
      bookingId={get("id")}
      salon={get("salon")}
      salonId={get("salonId")}
      service={get("service")}
      date={get("date")}
      time={get("time")}
      name={get("name")}
      phone={get("phone")}
      price={Number(get("price")) || 0}
    />
  );
}
