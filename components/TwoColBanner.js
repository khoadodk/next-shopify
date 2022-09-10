import ShopButton from './ShopButton';

export default function TwoColBanner({title1, bgImg1, title2, bgImg2}) {
  return (
    <div className="w-[100%] h-[400px] grid grid-cols-1 sm:grid-cols-2 gap-3 px-5">
      <div className="w-[100%] flex pr-3" style={{ backgroundImage: `url(${bgImg1})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className='w-[100%] text-white flex flex-col justify-center items-end gap-3'>
            <h1 className='uppercase text-[36px] font-bold'>{title1}</h1>
            <div><ShopButton /></div>
        </div>
      </div>

      <div className="w-[100%] flex pl-3" style={{ backgroundImage: `url(${bgImg2})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className='text-white flex flex-col justify-center gap-3'>
            <h1 className='uppercase text-[36px] font-bold'>{title2}</h1>
            <div><ShopButton /></div>
        </div>
      </div>
    </div>
  );
}