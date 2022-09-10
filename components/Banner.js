import ShopButton from './ShopButton';

export default function Banner({title, subtitle, bgImg}) {
  return (
      <div className="flex sm:h-[450px]" style={{ backgroundImage: `url(${bgImg})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className='my-auto p-[5vw] w-3/4 text-white gap-6 flex flex-col'>
            <h1 className='text-[36px] font-bold'>{title}</h1>
            <p className='text-[18px] font-semibold' >{subtitle}</p>
            <div><ShopButton /></div>
        </div>
      </div>
  );
}