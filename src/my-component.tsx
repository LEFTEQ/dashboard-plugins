import register from 'preact-custom-element';
import { WidgetContext, registerWidgetPlugin } from 'pwfl-widgets';

const MyPlugin = ({ pwflContext }: { pwflContext: WidgetContext }) => {
  console.log('My plugin - context', pwflContext);

  const openTaskDetail = async () => {
    const layerRef = await pwflContext.layerService.openTaskDetail({
      taskId: '016da3b5-fd69-11ee-9a03-7e1c89bf4114',
      taskContext: 'ASSIGNED_TO_ME',
    });

    layerRef.afterClosed.subscribe(() => {
      console.log('layer closed task');
    });
  };

  const openViewDetail = async () => {
    const layerRef = await pwflContext.layerService.openViewDetail({
      viewId: '63ea0e8dcf03b5001c641242',
      restrictingViewId: 1,
      submissionId: '63ea1006cf03b5001c641247',
    });

    layerRef.afterClosed.subscribe(() => {
      console.log('layer closed view');
    });
  };

  return (
    <div
      className={
        'bg-white rounded-lg h-full w-full flex items-center justify-center flex-col overflow-hidden gap-2'
      }
    >
      <span className={'text-gray-800 block'}>Ahoj, {pwflContext?.user.commonName}!</span>

      <span className={'text-gray-800 truncate block'}>
        Token:
        <span className={'break-all'}>{pwflContext?.token}</span>
      </span>

      <div className={'flex gap-1 items-center'}>
        <button
          className={'px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white'}
          onClick={openTaskDetail}
        >
          Detail úkolu
        </button>

        <button
          className={'px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white'}
          onClick={openViewDetail}
        >
          Detail přehledu
        </button>
      </div>
    </div>
  );
};

register(MyPlugin, 'x-my-plugin', ['pwflContext'], { shadow: false });

registerWidgetPlugin({
  settingsForm: undefined,
  weight: 0,
  defaultSettings: {},
  elementName: 'x-my-plugin',
  type: 'element',
  title: 'Test my plugin',
  isPlugin: true,
  gridSettings: {},
  group: 'PLUGINS',
});
