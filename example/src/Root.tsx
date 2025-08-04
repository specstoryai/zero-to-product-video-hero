import {Composition} from 'remotion';
import {MainVideo} from './MainVideo';

export const Root: React.FC = () => {
    return (
        <>
            <Composition
                id="TnyDevMCP"
                component={MainVideo}
                durationInFrames={30 * 30} // 30 seconds at 30fps
                width={1920}
                height={1080}
                fps={30}
                defaultProps={{
                    title: "tny.dev MCP in Action"
                }}
            />
        </>
    );
};