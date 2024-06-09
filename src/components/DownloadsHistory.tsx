import { Box, Flex, Heading, Icon, Stack, Text, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlineFolderOpen } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import { TbMoodSad } from 'react-icons/tb';
import { openFileExplorer } from 'src/utils/fn';
import { timeHourMin } from 'src/utils/time';

import { ExternalPlayerPopup } from './externalPopup';
import { formatBytes } from '../utils/formatBytes';

export function DownloadsHistory({ historyDetails }) {
    const [playId, setPlayId] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const playClickHandler = async (id) => {
        setPlayId(id);
        onOpen();
    };

    return (
        <Stack flex={1} flexDirection="column" pt={2}>
            <Heading fontSize={'xl'} fontFamily={'body'}>
                History
            </Heading>
            <Stack
                flex={1}
                flexDirection="column"
                alignItems="flex-start"
                p={1}
                pt={2}
                bg={'gray.900'}
                minWidth={'400px'}>
                {historyDetails?.details?.length !== 0 ? (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            rowGap: 20,
                        }}>
                        {historyDetails?.details?.map((item, index: number) =>
                            item.status === 'downloaded' ? (
                                <DownloadsHistoryItem
                                    key={index}
                                    data={item}
                                    playClickHandler={playClickHandler}
                                />
                            ) : null,
                        )}
                    </div>
                ) : (
                    <DownloadsHistoryEmpty />
                )}
            </Stack>
            {/* @ts-ignore */}
            <ExternalPlayerPopup
                isOpen={isOpen}
                onClose={onClose}
                playId={playId}
                historyPlay={true}
            />
        </Stack>
    );
}

function DownloadsHistoryItem({
    data,
    playClickHandler,
}: {
    data: any;
    playClickHandler: (id: string) => void;
}) {
    return (
        <section
            style={{
                width: '100%',
                display: 'flex',
                columnGap: 20,
                alignItems: 'center',
            }}>
            <Box
                style={{
                    cursor: 'pointer',
                    borderWidth: 1,
                    borderColor: 'white',
                    borderRadius: 20,
                    padding: 16,
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={() => playClickHandler(data.id)}>
                <Icon
                    as={FaPlay}
                    w={6}
                    h={6}
                    onClick={() => openFileExplorer(data.file_location)}
                />
            </Box>
            <div
                style={{
                    flexGrow: 1,
                    flexShrink: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <div
                    style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <strong>{data.file_name}</strong>
                    <span
                        style={{
                            color: '#999',
                            fontSize: 14,
                        }}>
                        {timeHourMin(data.created_on)}
                    </span>
                </div>
                <div
                    style={{
                        flexGrow: 1,
                        flexShrink: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <span
                        style={{
                            color: '#999',
                            fontSize: 14,
                        }}>
                        {formatBytes(data.total_size)}
                    </span>
                    <Tooltip label={'Show file in folder'} placement="bottom-end">
                        <Box
                            onClick={() => openFileExplorer(data.file_location)}
                            sx={{
                                cursor: 'pointer',
                            }}>
                            <AiOutlineFolderOpen size={22} />
                        </Box>
                    </Tooltip>
                </div>
            </div>
        </section>
    );
}

function DownloadsHistoryEmpty() {
    return (
        <Flex alignItems={'center'} justifyContent="center" p={3} pt={2} width={'100%'}>
            <Box color="gray.500" marginInline="2">
                <TbMoodSad size={24} />
            </Box>
            <Text fontWeight={600} color={'gray.500'} size="lg" textAlign={'center'}>
                No Previous Downloads
            </Text>
        </Flex>
    );
}
