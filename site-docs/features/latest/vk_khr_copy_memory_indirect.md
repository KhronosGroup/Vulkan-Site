# VK_KHR_copy_memory_indirect

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_KHR_copy_memory_indirect.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [4. API Features](#_api_features)
- [4._API_Features](#_api_features)
- [4.1. Feature](#_feature)
- [4.2. Properties](#_properties)
- [4.3. Commands](#_commands)
- [5. Examples](#_examples)
- [6. Issues](#_issues)
- [6.1. Should we add copyCount to be also sourced from the GPU and use the minimum of the API specified and GPU value?](#_should_we_add_copycount_to_be_also_sourced_from_the_gpu_and_use_the_minimum_of_the_api_specified_and_gpu_value)
- [6.1._Should_we_add_copyCount_to_be_also_sourced_from_the_GPU_and_use_the_minimum_of_the_API_specified_and_GPU_value?](#_should_we_add_copycount_to_be_also_sourced_from_the_gpu_and_use_the_minimum_of_the_api_specified_and_gpu_value)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)
[4. API Features](#_api_features)

[4.1. Feature](#_feature)
[4.2. Properties](#_properties)
[4.3. Commands](#_commands)

[5. Examples](#_examples)
[6. Issues](#_issues)

[6.1. Should we add `copyCount` to be also sourced from the GPU and use the minimum of the API specified and GPU value?](#_should_we_add_copycount_to_be_also_sourced_from_the_gpu_and_use_the_minimum_of_the_api_specified_and_gpu_value)

This document details the VK_KHR_copy_memory_indirect extension which
adds support for performing copies between memory and image regions using
indirect parameters that are read directly from the device memory
during execution.

While it is possible to copy data between memory regions by using existing copy
commands, sometimes the copy parameters may not be available at the time of command
buffer creation. This is solved by a round-trip between host and device to fetch
the copy parameters.

The alternative is to have an indirect version of the copy command that
reads the copy parameters directly on the device and these copy parameters need
not be known at command buffer creation time.

This extension introduces two indirect commands: one for copying between memory
regions and another for copying between image and memory regions, with the copy
parameters being read from device memory during execution.

The following provides a basic overview of how this extension can be used:

The core functionality of this extension is enabled by `indirectMemoryCopy` and `indirectMemoryToImageCopy`, which
facilitate copying between memory regions and from memory to image regions, respectively:

typedef struct VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR {
    VkStructureType                       sType;
    void*                                 pNext;
    VkBool32                              indirectMemoryCopy;
    VkBool32                              indirectMemoryToImageCopy;
} VkPhysicalDeviceCopyMemoryIndirectFeaturesKHR;

The following property is exposed by this extension:

typedef struct VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR {
    VkStructureType                       sType;
    void*                                 pNext;
    VkQueueFlags                          supportedQueues;
} VkPhysicalDeviceCopyMemoryIndirectPropertiesKHR;

`supportedQueues` is a bitmask of `VkQueueFlagBits` indicating the family of queues on which indirect copy commands are supported.

This extension provides two commands for copying between memory regions and from memory to image regions, detailed further in the examples section below:

VKAPI_ATTR void VKAPI_CALL vkCmdCopyMemoryIndirectKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMemoryIndirectInfoKHR*          pCopyMemoryIndirectInfo);

VKAPI_ATTR void VKAPI_CALL vkCmdCopyMemoryToImageIndirectKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMemoryToImageIndirectInfoKHR*   pCopyMemoryToImageIndirectInfo);

`vkCmdCopyMemoryIndirectKHR` can be used as:

void vkCmdCopyMemoryIndirectKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMemoryIndirectInfoKHR*          pCopyMemoryIndirectInfo);

`VkCopyMemoryIndirectInfoKHR` is a structure describing the copy count, copy flags and the address range containing copy parameters:

typedef struct VkCopyMemoryIndirectInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkAddressCopyFlagsKHR             srcCopyFlags;
    VkAddressCopyFlagsKHR             dstCopyFlags;
    uint32_t                          copyCount;
    VkStridedDeviceAddressRangeKHR    copyAddressRange;
} VkCopyMemoryIndirectInfoKHR;

`srcCopyFlags` and `dstCopyFlags` define copy flags that specify if memory regions are on device memory, are sparse or are of protected type. They are specified with below flags:

typedef enum VkAddressCopyFlagBitsKHR {
    VK_ADDRESS_COPY_DEVICE_LOCAL_BIT_KHR = 0x00000001,
    VK_ADDRESS_COPY_SPARSE_BIT_KHR = 0x00000002,
    VK_ADDRESS_COPY_PROTECTED_BIT_KHR = 0x00000004,
} VkAddressCopyFlagBitsKHR;

`copyAddressRange` contains the copy parameters as an array of `VkCopyMemoryIndirectCommandKHR` structures that specify the source and destination copy addresses and size:

typedef struct VkCopyMemoryIndirectCommandKHR {
    VkDeviceAddress          srcAddress;
    VkDeviceAddress          dstAddress;
    VkDeviceSize             size;
} VkCopyMemoryIndirectCommandKHR;

Similarly, use `vkCmdCopyMemoryToImageIndirectKHR` to perform memory to image copies:

void vkCmdCopyMemoryToImageIndirectKHR(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMemoryToImageIndirectInfoKHR*   pCopyMemoryToImageIndirectInfo);

`VkCopyMemoryToImageIndirectInfoKHR` is a structure describing the source copy flag, copy count, the address range containing copy parameters and destination image properties:

typedef struct VkCopyMemoryToImageIndirectInfoKHR {
    VkStructureType                    sType;
    const void*                        pNext;
    VkAddressCopyFlagsKHR              srcCopyFlags;
    uint32_t                           copyCount;
    VkStridedDeviceAddressRangeKHR     copyAddressRange;
    VkImage                            dstImage;
    VkImageLayout                      dstImageLayout;
    const VkImageSubresourceLayers*    pImageSubresources;
} VkCopyMemoryToImageIndirectInfoKHR;

`copyAddressRange` contains the memory to image copy parameters as an array of `VkCopyMemoryToImageIndirectCommandKHR` structures that specify the source copy address, destination copy image region and copy offsets/extent:

`VkStridedDeviceAddressRangeKHR` containing copy parameters and `VkCopyMemoryToImageIndirectCommandKHR` defining the copy regions are defined as:

typedef struct VkStridedDeviceAddressRangeKHR {
    VkDeviceAddress    address;
    VkDeviceSize       size;
    VkDeviceSize       stride;
} VkStridedDeviceAddressRangeKHR;

typedef struct VkCopyMemoryToImageIndirectCommandKHR {
    VkDeviceAddress             srcAddress;
    uint32_t                    bufferRowLength;
    uint32_t                    bufferImageHeight;
    VkImageSubresourceLayers    imageSubresource;
    VkOffset3D                  imageOffset;
    VkExtent3D                  imageExtent;
} VkCopyMemoryToImageIndirectCommandKHR;

Note that the values specified in device memory at `imageSubresource` must match the values specified in `pImageSubresources` parameter of `VkCopyMemoryToImageIndirectInfoKHR` during command recording.

No. Though this falls in line with some of the other similar indirect
API commands, this can add significant complexity for memory to image copies.
So, the consensus is to not add it.
