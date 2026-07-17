# Resource Creation

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/resources.html

## Table of Contents

- [Buffers](#resources-buffers)
- [Buffer Views](#resources-buffer-views)
- [Buffer View Format Features](#resources-buffer-view-format-features)
- [Buffer_View_Format_Features](#resources-buffer-view-format-features)
- [Buffer Device Addresses](#resources-buffer-device-addresses)
- [Buffer_Device_Addresses](#resources-buffer-device-addresses)
- [Images](#resources-images)
- [Use External Memory On Open Harmony OS platform](#external-memory-on-OHOS)
- [Use_External_Memory_On_Open_Harmony_OS_platform](#external-memory-on-OHOS)
- [Image Format Features](#resources-image-format-features)
- [Image_Format_Features](#resources-image-format-features)
- [Corner-Sampled Images](#resources-images-corner-sampled)
- [Image Mip Level Sizing](#resources-image-mip-level-sizing)
- [Image_Mip_Level_Sizing](#resources-image-mip-level-sizing)
- [Conventional Images](#_conventional_images)
- [Corner-Sampled Images](#_corner_sampled_images)
- [Image Capture Replay for Descriptor Heaps](#resources-images-heapcapturereplay)
- [Image_Capture_Replay_for_Descriptor_Heaps](#resources-images-heapcapturereplay)
- [Tensor Capture Replay for Descriptor Heaps](#resources-tensors-heapcapturereplay)
- [Tensor_Capture_Replay_for_Descriptor_Heaps](#resources-tensors-heapcapturereplay)
- [Image Layouts](#resources-image-layouts)
- [Image Layout Matching Rules](#resources-image-layouts-matching-rule)
- [Image_Layout_Matching_Rules](#resources-image-layouts-matching-rule)
- [Image Layout Rules with External Memory](#resources-external-image-layout-rules)
- [Image_Layout_Rules_with_External_Memory](#resources-external-image-layout-rules)
- [Image Views](#resources-image-views)
- [Image View Format Features](#resources-image-view-format-features)
- [Image_View_Format_Features](#resources-image-view-format-features)
- [Acceleration Structures](#resources-acceleration-structures)
- [Micromaps](#resources-micromaps)
- [Resource Memory Association](#resources-association)
- [Resource_Memory_Association](#resources-association)
- [Resource Sharing Mode](#resources-sharing)
- [Resource_Sharing_Mode](#resources-sharing)
- [External Resource Sharing](#resources-external-sharing)
- [External_Resource_Sharing](#resources-external-sharing)
- [Memory Aliasing](#resources-memory-aliasing)
- [Resource Memory Overlap](#resources-memory-overlap)
- [Resource_Memory_Overlap](#resources-memory-overlap)
- [Buffer Collections](#resources-buffer-collection-fuchsia)
- [Definitions](#_definitions)
- [Platform Initialization for Buffer Collections](#_platform_initialization_for_buffer_collections)
- [Platform_Initialization_for_Buffer_Collections](#_platform_initialization_for_buffer_collections)
- [Create the Buffer Collection](#_create_the_buffer_collection)
- [Create_the_Buffer_Collection](#_create_the_buffer_collection)
- [Set the Constraints](#_set_the_constraints)
- [Set_the_Constraints](#_set_the_constraints)
- [Set Image-Based Buffer Collection Constraints](#_set_image_based_buffer_collection_constraints)
- [Set_Image-Based_Buffer_Collection_Constraints](#_set_image_based_buffer_collection_constraints)
- [Set Buffer-Based Buffer Collection Constraints](#_set_buffer_based_buffer_collection_constraints)
- [Set_Buffer-Based_Buffer_Collection_Constraints](#_set_buffer_based_buffer_collection_constraints)
- [Retrieve Buffer Collection Properties](#_retrieve_buffer_collection_properties)
- [Retrieve_Buffer_Collection_Properties](#_retrieve_buffer_collection_properties)
- [Memory Allocation](#_memory_allocation)
- [Tensors](#resources-tensors)
- [Tensor Description](#resources-tensor-description)
- [Tensor Views](#resources-tensor-views)
- [Tensor View Format Features](#resources-tensor-view-format-features)
- [Tensor_View_Format_Features](#resources-tensor-view-format-features)

## Content

Vulkan supports three primary resource types: *buffers*, *images*, and
*tensors*.
Resources are views of memory with associated formatting and dimensionality.
Buffers provide access to raw arrays of bytes, whereas images **can** be
multidimensional and **may** have associated metadata.
Tensors **can** be multidimensional, contain format information like images and
**may** have associated metadata.

Other resource types, such as [acceleration structures](#resources-acceleration-structures)
and [micromaps](#resources-micromaps)
use buffers as the backing store for opaque data structures.

Buffers represent linear arrays of data which are used for various purposes
by binding them to a graphics or compute pipeline via descriptor sets or
certain commands, or by directly specifying them as parameters to certain
commands.

Buffers are represented by `VkBuffer` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkBuffer)

To create buffers, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateBuffer(
    VkDevice                                    device,
    const VkBufferCreateInfo*                   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkBuffer*                                   pBuffer);

* 
`device` is the logical device that creates the buffer object.

* 
`pCreateInfo` is a pointer to a [VkBufferCreateInfo](#VkBufferCreateInfo) structure
containing parameters affecting creation of the buffer.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pBuffer` is a pointer to a [VkBuffer](#VkBuffer) handle in which the
resulting buffer object is returned.

Implementations **may** fail to create a buffer if the
[effective usage](#resources-effective-buffer-usage) includes the
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkBufferUsageFlagBits2KHR) flag, and `size` is
greater than the maximum of
[`maxResourceHeapSize`](limits.html#limits-maxResourceHeapSize) and
[`maxSamplerHeapSize`](limits.html#limits-maxSamplerHeapSize).
If this happens, [VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult) will be returned.

|  | This is an issue identified with [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap), which we
| --- | --- |
plan to tighten up for the KHR version.
Applications using [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap) may wish to avoid
suballocating heaps from the same buffer, instead creating one buffer per
heap, to avoid situations where this causes issues. |

Valid Usage

* 
[](#VUID-vkCreateBuffer-device-09664) VUID-vkCreateBuffer-device-09664

    `device` **must** support at least one queue family with one of the
    [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits),
    [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits),
[VK_QUEUE_SPARSE_BINDING_BIT](devsandqueues.html#VkQueueFlagBits),
    [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or
    [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capabilities

* 
[](#VUID-vkCreateBuffer-flags-00911) VUID-vkCreateBuffer-flags-00911

If the `flags` member of `pCreateInfo` includes
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits),
and the [    `extendedSparseAddressSpace`](features.html#features-extendedSparseAddressSpace) feature is not enabled,
creating this `VkBuffer` **must** not cause the total required sparse
memory for all currently valid sparse resources on the device to exceed
`VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`

* 
[](#VUID-vkCreateBuffer-flags-09383) VUID-vkCreateBuffer-flags-09383

If the `flags` member of `pCreateInfo` includes
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits), the
[    `extendedSparseAddressSpace`](features.html#features-extendedSparseAddressSpace) feature is enabled, and the
`usage` member of `pCreateInfo` contains bits not in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseBufferUsageFlags`,
creating this `VkBuffer` **must** not cause the total required sparse
memory for all currently valid sparse resources on the device, excluding
`VkBuffer` created with `usage` member of `pCreateInfo`
containing bits in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseBufferUsageFlags`
and `VkImage` created with `usage` member of `pCreateInfo`
containing bits in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseImageUsageFlags`,
to exceed `VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`

* 
[](#VUID-vkCreateBuffer-flags-09384) VUID-vkCreateBuffer-flags-09384

If the `flags` member of `pCreateInfo` includes
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits) and the
[    `extendedSparseAddressSpace`](features.html#features-extendedSparseAddressSpace) feature is enabled, creating this
`VkBuffer` **must** not cause the total required sparse memory for all
currently valid sparse resources on the device to exceed
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseAddressSpaceSize`

* 
[](#VUID-vkCreateBuffer-pNext-06387) VUID-vkCreateBuffer-pNext-06387

If using the [VkBuffer](#VkBuffer) for an import operation from a
[VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) where a
[VkBufferCollectionBufferCreateInfoFUCHSIA](#VkBufferCollectionBufferCreateInfoFUCHSIA) has been chained to
`pNext`, `pCreateInfo` **must** match the
[VkBufferConstraintsInfoFUCHSIA](#VkBufferConstraintsInfoFUCHSIA)::`createInfo` used when setting
the constraints on the buffer collection with
[vkSetBufferCollectionBufferConstraintsFUCHSIA](#vkSetBufferCollectionBufferConstraintsFUCHSIA)

Valid Usage (Implicit)

* 
[](#VUID-vkCreateBuffer-device-parameter) VUID-vkCreateBuffer-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateBuffer-pCreateInfo-parameter) VUID-vkCreateBuffer-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkBufferCreateInfo](#VkBufferCreateInfo) structure

* 
[](#VUID-vkCreateBuffer-pAllocator-parameter) VUID-vkCreateBuffer-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateBuffer-pBuffer-parameter) VUID-vkCreateBuffer-pBuffer-parameter

 `pBuffer` **must** be a valid pointer to a [VkBuffer](#VkBuffer) handle

* 
[](#VUID-vkCreateBuffer-device-queuecount) VUID-vkCreateBuffer-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkBufferCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkBufferCreateInfo {
    VkStructureType        sType;
    const void*            pNext;
    VkBufferCreateFlags    flags;
    VkDeviceSize           size;
    VkBufferUsageFlags     usage;
    VkSharingMode          sharingMode;
    uint32_t               queueFamilyIndexCount;
    const uint32_t*        pQueueFamilyIndices;
} VkBufferCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkBufferCreateFlagBits](#VkBufferCreateFlagBits) specifying
additional parameters of the buffer.

* 
`size` is the size in bytes of the buffer to be created.

* 
`usage` is a bitmask of [VkBufferUsageFlagBits](#VkBufferUsageFlagBits) specifying
allowed usages of the buffer.

* 
`sharingMode` is a [VkSharingMode](#VkSharingMode) value specifying the sharing
mode of the buffer when it will be accessed by multiple queue families.

* 
`queueFamilyIndexCount` is the number of entries in the
`pQueueFamilyIndices` array.

* 
`pQueueFamilyIndices` is a pointer to an array of queue families
that will access this buffer.
It is ignored if `sharingMode` is not
[VK_SHARING_MODE_CONCURRENT](#VkSharingMode).

`usage` defines the effective usage flags for the buffer.
If the `pNext` chain includes a [VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo)
structure, [VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo)::`usage` from that
structure is used as the effective usage instead of `usage` from this
structure.

Valid Usage

* 
[](#VUID-VkBufferCreateInfo-None-09499) VUID-VkBufferCreateInfo-None-09499

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo) structure,
`usage` **must** be a valid combination of [VkBufferUsageFlagBits](#VkBufferUsageFlagBits)
values

* 
[](#VUID-VkBufferCreateInfo-None-09500) VUID-VkBufferCreateInfo-None-09500

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo) structure,
`usage` **must** not be 0

* 
[](#VUID-VkBufferCreateInfo-size-00912) VUID-VkBufferCreateInfo-size-00912

`size` **must** be greater than `0`

* 
[](#VUID-VkBufferCreateInfo-sharingMode-00913) VUID-VkBufferCreateInfo-sharingMode-00913

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](#VkSharingMode),
`pQueueFamilyIndices` **must** be a valid pointer to an array of
`queueFamilyIndexCount` `uint32_t` values

* 
[](#VUID-VkBufferCreateInfo-sharingMode-00914) VUID-VkBufferCreateInfo-sharingMode-00914

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](#VkSharingMode),
`queueFamilyIndexCount` **must** be greater than `1`

* 
[](#VUID-VkBufferCreateInfo-sharingMode-01419) VUID-VkBufferCreateInfo-sharingMode-01419

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](#VkSharingMode), each element
of `pQueueFamilyIndices` **must** be unique and **must** be less than
`pQueueFamilyPropertyCount` returned by
either [vkGetPhysicalDeviceQueueFamilyProperties2](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties2) or
[vkGetPhysicalDeviceQueueFamilyProperties](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties) for the
`physicalDevice` that was used to create `device`

* 
[](#VUID-VkBufferCreateInfo-flags-00915) VUID-VkBufferCreateInfo-flags-00915

If the [`sparseBinding`](features.html#features-sparseBinding) feature is not
enabled,
`flags` **must** not contain [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkBufferCreateInfo-flags-00916) VUID-VkBufferCreateInfo-flags-00916

If the [`sparseResidencyBuffer`](features.html#features-sparseResidencyBuffer)
feature is not enabled,
`flags` **must** not contain
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkBufferCreateInfo-flags-00917) VUID-VkBufferCreateInfo-flags-00917

If the [`sparseResidencyAliased`](features.html#features-sparseResidencyAliased)
feature is not enabled,
`flags` **must** not contain [VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkBufferCreateInfo-flags-00918) VUID-VkBufferCreateInfo-flags-00918

If `flags` contains [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#VkBufferCreateFlagBits) or
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](#VkBufferCreateFlagBits), it **must** also contain
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkBufferCreateInfo-pNext-00920) VUID-VkBufferCreateInfo-pNext-00920

If the `pNext` chain includes a
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo) structure, its `handleTypes`
member **must** only contain bits that are also in
[VkExternalBufferProperties](capabilities.html#VkExternalBufferProperties)::`externalMemoryProperties.compatibleHandleTypes`,
as returned by [vkGetPhysicalDeviceExternalBufferProperties](capabilities.html#vkGetPhysicalDeviceExternalBufferProperties) with
`pExternalBufferInfo->handleType` equal to any one of the handle
types specified in
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo)::`handleTypes`

* 
[](#VUID-VkBufferCreateInfo-flags-01887) VUID-VkBufferCreateInfo-flags-01887

If the [`protectedMemory`](features.html#features-protectedMemory) feature is
not enabled, `flags` **must** not contain
[VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkBufferCreateInfo-None-01888) VUID-VkBufferCreateInfo-None-01888

If any of the bits [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits),
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#VkBufferCreateFlagBits), or
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](#VkBufferCreateFlagBits) are set,
[VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits) **must** not also be set

* 
[](#VUID-VkBufferCreateInfo-pNext-01571) VUID-VkBufferCreateInfo-pNext-01571

If the `pNext` chain includes a
[VkDedicatedAllocationBufferCreateInfoNV](#VkDedicatedAllocationBufferCreateInfoNV) structure, and the
`dedicatedAllocation` member of the chained structure is
[VK_TRUE](fundamentals.html#VK_TRUE), then `flags` **must** not include
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits),
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#VkBufferCreateFlagBits), or
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkBufferCreateInfo-deviceAddress-02604) VUID-VkBufferCreateInfo-deviceAddress-02604

If [VkBufferDeviceAddressCreateInfoEXT](#VkBufferDeviceAddressCreateInfoEXT)::`deviceAddress` is not
zero, `flags` **must** include
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkBufferCreateInfo-opaqueCaptureAddress-03337) VUID-VkBufferCreateInfo-opaqueCaptureAddress-03337

If
[VkBufferOpaqueCaptureAddressCreateInfo](#VkBufferOpaqueCaptureAddressCreateInfo)::`opaqueCaptureAddress`
is not zero, `flags` **must** include
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkBufferCreateInfo-flags-03338) VUID-VkBufferCreateInfo-flags-03338

    If `flags` includes
    [VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits), the
    [](features.html#features-bufferDeviceAddressCaptureReplayEXT)[VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](features.html#VkPhysicalDeviceBufferDeviceAddressFeaturesEXT)::`bufferDeviceAddressCaptureReplay`
    feature
or the
    [    `bufferDeviceAddressCaptureReplay`](features.html#features-bufferDeviceAddressCaptureReplay) feature
    **must** be enabled

* 
[](#VUID-VkBufferCreateInfo-usage-04813) VUID-VkBufferCreateInfo-usage-04813

If `usage` includes [VK_BUFFER_USAGE_VIDEO_DECODE_SRC_BIT_KHR](#VkBufferUsageFlagBits)
or [VK_BUFFER_USAGE_VIDEO_DECODE_DST_BIT_KHR](#VkBufferUsageFlagBits),
and `flags` does not include
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkBufferCreateFlagBits),
then the `pNext` chain **must** include a
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure with `profileCount`
greater than `0` and `pProfiles` including at least one
[VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) structure with a `videoCodecOperation`
member specifying a decode operation

* 
[](#VUID-VkBufferCreateInfo-usage-04814) VUID-VkBufferCreateInfo-usage-04814

If `usage` includes [VK_BUFFER_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](#VkBufferUsageFlagBits)
or [VK_BUFFER_USAGE_VIDEO_ENCODE_DST_BIT_KHR](#VkBufferUsageFlagBits),
and `flags` does not include
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkBufferCreateFlagBits),
then the `pNext` chain **must** include a
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure with `profileCount`
greater than `0` and `pProfiles` including at least one
[VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) structure with a `videoCodecOperation`
member specifying an encode operation

* 
[](#VUID-VkBufferCreateInfo-flags-08325) VUID-VkBufferCreateInfo-flags-08325

If `flags` includes
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkBufferCreateFlagBits), then
[`videoMaintenance1`](features.html#features-videoMaintenance1) **must** be enabled

* 
[](#VUID-VkBufferCreateInfo-pNext-10783) VUID-VkBufferCreateInfo-pNext-10783

If the `pNext` chain includes a [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR)
structure and for any element of its `pProfiles` member
`videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](videocoding.html#VkVideoCodecOperationFlagBitsKHR), then the
[`videoDecodeVP9`](features.html#features-videoDecodeVP9) feature **must** be
enabled

* 
[](#VUID-VkBufferCreateInfo-pNext-10249) VUID-VkBufferCreateInfo-pNext-10249

If the `pNext` chain includes a [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR)
structure and for any element of its `pProfiles` member
`videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](videocoding.html#VkVideoCodecOperationFlagBitsKHR), then the
[`videoEncodeAV1`](features.html#features-videoEncodeAV1) feature **must** be
enabled

* 
[](#VUID-VkBufferCreateInfo-pNext-10919) VUID-VkBufferCreateInfo-pNext-10919

If the `pNext` chain includes a
[VkVideoEncodeProfileRgbConversionInfoVALVE](videocoding.html#VkVideoEncodeProfileRgbConversionInfoVALVE) structure, then the
[`videoEncodeRgbConversion`](features.html#features-videoEncodeRgbConversion)
feature **must** be enabled

* 
[](#VUID-VkBufferCreateInfo-size-06409) VUID-VkBufferCreateInfo-size-06409

`size` **must** be less than or equal to
[VkPhysicalDeviceMaintenance4Properties](limits.html#VkPhysicalDeviceMaintenance4Properties)::`maxBufferSize`

* 
[](#VUID-VkBufferCreateInfo-usage-08097) VUID-VkBufferCreateInfo-usage-08097

If `usage` includes
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits), creating this
`VkBuffer` **must** not cause the total required space for all
currently valid buffers using this flag on the device to exceed
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`samplerDescriptorBufferAddressSpaceSize`
or
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`descriptorBufferAddressSpaceSize`

* 
[](#VUID-VkBufferCreateInfo-usage-08098) VUID-VkBufferCreateInfo-usage-08098

If `usage` includes
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits), creating this
`VkBuffer` **must** not cause the total required space for all
currently valid buffers using this flag on the device to exceed
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`resourceDescriptorBufferAddressSpaceSize`
or
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`descriptorBufferAddressSpaceSize`

* 
[](#VUID-VkBufferCreateInfo-flags-08099) VUID-VkBufferCreateInfo-flags-08099

If `flags` includes
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkBufferCreateFlagBits), the
[    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-VkBufferCreateInfo-pNext-08100) VUID-VkBufferCreateInfo-pNext-08100

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) structure, `flags`
**must** contain
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkBufferCreateInfo-usage-08101) VUID-VkBufferCreateInfo-usage-08101

If `usage` includes
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits), the
[    `descriptorBufferPushDescriptors`](features.html#features-descriptorBufferPushDescriptors) feature **must** be enabled

* 
[](#VUID-VkBufferCreateInfo-usage-08102) VUID-VkBufferCreateInfo-usage-08102

If `usage` includes
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits)
[    `VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](limits.html#limits-bufferlessPushDescriptors)
**must** be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkBufferCreateInfo-usage-08103) VUID-VkBufferCreateInfo-usage-08103

If `usage` includes
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits),
`usage` **must** contain at least one of
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits) or
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits)

* 
[](#VUID-VkBufferCreateInfo-tileMemoryHeap-10762) VUID-VkBufferCreateInfo-tileMemoryHeap-10762

If the [`tileMemoryHeap`](features.html#features-tileMemoryHeap) feature is not
enabled, `usage` **must** not include
[VK_BUFFER_USAGE_TILE_MEMORY_BIT_QCOM](#VkBufferUsageFlagBits)

* 
[](#VUID-VkBufferCreateInfo-usage-10763) VUID-VkBufferCreateInfo-usage-10763

  If `usage` includes [VK_BUFFER_USAGE_TILE_MEMORY_BIT_QCOM](#VkBufferUsageFlagBits), then
`flags` **must** not contain any of the following bits

[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits)

* 
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#VkBufferCreateFlagBits)

* 
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](#VkBufferCreateFlagBits)

* 
[VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits)

* 
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits)

* 
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkBufferCreateFlagBits)

* 
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkBufferCreateFlagBits)

[](#VUID-VkBufferCreateInfo-usage-10764) VUID-VkBufferCreateInfo-usage-10764

If `usage` includes [VK_BUFFER_USAGE_TILE_MEMORY_BIT_QCOM](#VkBufferUsageFlagBits), then
only the following `usages` may be set:

* 
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits)

* 
and if
[VkPhysicalDeviceTileMemoryHeapPropertiesQCOM](limits.html#VkPhysicalDeviceTileMemoryHeapPropertiesQCOM)::`tileBufferTransfers`
is [VK_TRUE](fundamentals.html#VK_TRUE) then additionally
[VK_BUFFER_USAGE_TRANSFER_SRC_BIT](#VkBufferUsageFlagBits) or
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](#VkBufferUsageFlagBits)

[](#VUID-VkBufferCreateInfo-flags-09641) VUID-VkBufferCreateInfo-flags-09641

If `flags` includes [VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits), then the
[effective usage](#resources-effective-buffer-usage) **must** not contain
bits other than

* 
[VK_BUFFER_USAGE_TRANSFER_SRC_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR](#VkBufferUsageFlagBits2KHR)

* 
[VK_BUFFER_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR](#VkBufferUsageFlagBits2KHR)

* 
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkBufferUsageFlagBits2KHR)

[](#VUID-VkBufferCreateInfo-flags-11277) VUID-VkBufferCreateInfo-flags-11277

If the
[`protectedDescriptorHeaps`](limits.html#limits-protectedDescriptorHeaps)
property is not supported and the [    effective usage](#resources-effective-buffer-usage) includes the
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkBufferUsageFlagBits2KHR) flag, `flags` **must**
not include the [VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits) flag

[](#VUID-VkBufferCreateInfo-flags-11279) VUID-VkBufferCreateInfo-flags-11279

If the [`sparseDescriptorHeaps`](limits.html#limits-sparseDescriptorHeaps)
property is not supported and the [    effective usage](#resources-effective-buffer-usage) includes the
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkBufferUsageFlagBits2KHR) flag, `flags` **must**
not include any of the [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits),
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#VkBufferCreateFlagBits), or
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](#VkBufferCreateFlagBits) flags

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCreateInfo-sType-sType) VUID-VkBufferCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferCreateInfo-pNext-pNext) VUID-VkBufferCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBufferCollectionBufferCreateInfoFUCHSIA](#VkBufferCollectionBufferCreateInfoFUCHSIA), [VkBufferDeviceAddressCreateInfoEXT](#VkBufferDeviceAddressCreateInfoEXT), [VkBufferOpaqueCaptureAddressCreateInfo](#VkBufferOpaqueCaptureAddressCreateInfo), [VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo), [VkDedicatedAllocationBufferCreateInfoNV](#VkDedicatedAllocationBufferCreateInfoNV), [VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo), [VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT), or [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR)

* 
[](#VUID-VkBufferCreateInfo-sType-unique) VUID-VkBufferCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBufferCreateInfo-flags-parameter) VUID-VkBufferCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkBufferCreateFlagBits](#VkBufferCreateFlagBits) values

* 
[](#VUID-VkBufferCreateInfo-sharingMode-parameter) VUID-VkBufferCreateInfo-sharingMode-parameter

 `sharingMode` **must** be a valid [VkSharingMode](#VkSharingMode) value

The `VkBufferUsageFlags2CreateInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkBufferUsageFlags2CreateInfo {
    VkStructureType        sType;
    const void*            pNext;
    VkBufferUsageFlags2    usage;
} VkBufferUsageFlags2CreateInfo;

// Provided by VK_KHR_maintenance5
// Equivalent to VkBufferUsageFlags2CreateInfo
typedef VkBufferUsageFlags2CreateInfo VkBufferUsageFlags2CreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`usage` is a bitmask of [VkBufferUsageFlagBits2](#VkBufferUsageFlagBits2) specifying
allowed usages of the buffer.

If this structure is included in the `pNext` chain of a buffer creation
structure, `usage` is used instead of the corresponding `usage`
value passed in that creation structure, allowing additional usage flags to
be specified.
If this structure is included in the `pNext` chain of a buffer query
structure, the usage flags of the buffer are returned in `usage` of this
structure, and the usage flags representable in `usage` of the buffer
query structure are also returned in that field.

Valid Usage (Implicit)

* 
[](#VUID-VkBufferUsageFlags2CreateInfo-sType-sType) VUID-VkBufferUsageFlags2CreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_USAGE_FLAGS_2_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferUsageFlags2CreateInfo-usage-parameter) VUID-VkBufferUsageFlags2CreateInfo-usage-parameter

 `usage` **must** be a valid combination of [VkBufferUsageFlagBits2](#VkBufferUsageFlagBits2) values

* 
[](#VUID-VkBufferUsageFlags2CreateInfo-usage-requiredbitmask) VUID-VkBufferUsageFlags2CreateInfo-usage-requiredbitmask

 `usage` **must** not be `0`

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](#VkBufferCreateInfo)

* 
[VkBufferViewCreateInfo](#VkBufferViewCreateInfo)

* 
[VkDescriptorBufferBindingInfoEXT](descriptorsets.html#VkDescriptorBufferBindingInfoEXT)

* 
[VkPhysicalDeviceExternalBufferInfo](capabilities.html#VkPhysicalDeviceExternalBufferInfo)

Bits which **can** be set in [VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo)::`usage`,
specifying usage behavior of a buffer, are:

// Provided by VK_VERSION_1_4
// Flag bits for VkBufferUsageFlagBits2
typedef VkFlags64 VkBufferUsageFlagBits2;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFER_SRC_BIT = 0x00000001ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFER_DST_BIT = 0x00000002ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_UNIFORM_TEXEL_BUFFER_BIT = 0x00000004ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_STORAGE_TEXEL_BUFFER_BIT = 0x00000008ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_UNIFORM_BUFFER_BIT = 0x00000010ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_STORAGE_BUFFER_BIT = 0x00000020ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_INDEX_BUFFER_BIT = 0x00000040ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VERTEX_BUFFER_BIT = 0x00000080ULL;
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_INDIRECT_BUFFER_BIT = 0x00000100ULL;
// Provided by VK_VERSION_1_4
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_SHADER_DEVICE_ADDRESS_BIT = 0x00020000ULL;
// Provided by VK_AMDX_shader_enqueue with VK_KHR_maintenance5 or VK_VERSION_1_4
#ifdef VK_ENABLE_BETA_EXTENSIONS
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_EXECUTION_GRAPH_SCRATCH_BIT_AMDX = 0x02000000ULL;
#endif
// Provided by VK_EXT_descriptor_heap
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT = 0x10000000ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFER_SRC_BIT_KHR = 0x00000001ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFER_DST_BIT_KHR = 0x00000002ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_UNIFORM_TEXEL_BUFFER_BIT_KHR = 0x00000004ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_STORAGE_TEXEL_BUFFER_BIT_KHR = 0x00000008ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_UNIFORM_BUFFER_BIT_KHR = 0x00000010ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_STORAGE_BUFFER_BIT_KHR = 0x00000020ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_INDEX_BUFFER_BIT_KHR = 0x00000040ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VERTEX_BUFFER_BIT_KHR = 0x00000080ULL;
// Provided by VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_INDIRECT_BUFFER_BIT_KHR = 0x00000100ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_conditional_rendering
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_CONDITIONAL_RENDERING_BIT_EXT = 0x00000200ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_ray_tracing_pipeline
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_SHADER_BINDING_TABLE_BIT_KHR = 0x00000400ULL;
// Provided by VK_KHR_maintenance5 with VK_NV_ray_tracing
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_RAY_TRACING_BIT_NV = 0x00000400ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_transform_feedback
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT = 0x00000800ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_transform_feedback
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT = 0x00001000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_video_decode_queue
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR = 0x00002000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_video_decode_queue
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VIDEO_DECODE_DST_BIT_KHR = 0x00004000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_video_encode_queue
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR = 0x00008000ULL;
// Provided by VK_KHR_maintenance5 with VK_KHR_video_encode_queue
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_VIDEO_ENCODE_SRC_BIT_KHR = 0x00010000ULL;
// Provided by VK_KHR_maintenance5 with VK_VERSION_1_2 or VK_KHR_buffer_device_address or VK_EXT_buffer_device_address
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_SHADER_DEVICE_ADDRESS_BIT_KHR = 0x00020000ULL;
// Provided by VK_KHR_acceleration_structure with VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR = 0x00080000ULL;
// Provided by VK_KHR_acceleration_structure with VK_KHR_maintenance5
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR = 0x00100000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_descriptor_buffer
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT = 0x00200000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_descriptor_buffer
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT = 0x00400000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_descriptor_buffer
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT = 0x04000000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_opacity_micromap
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_MICROMAP_BUILD_INPUT_READ_ONLY_BIT_EXT = 0x00800000ULL;
// Provided by VK_KHR_maintenance5 with VK_EXT_opacity_micromap
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_MICROMAP_STORAGE_BIT_EXT = 0x01000000ULL;
// Provided by VK_AMDX_dense_geometry_format
#ifdef VK_ENABLE_BETA_EXTENSIONS
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_COMPRESSED_DATA_DGF1_BIT_AMDX = 0x200000000ULL;
#endif
// Provided by VK_ARM_data_graph
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_DATA_GRAPH_FOREIGN_DESCRIPTOR_BIT_ARM = 0x20000000ULL;
// Provided by VK_QCOM_tile_memory_heap
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_TILE_MEMORY_BIT_QCOM = 0x08000000ULL;
// Provided by VK_EXT_memory_decompression
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_MEMORY_DECOMPRESSION_BIT_EXT = 0x100000000ULL;
// Provided by VK_EXT_device_generated_commands
static const VkBufferUsageFlagBits2 VK_BUFFER_USAGE_2_PREPROCESS_BUFFER_BIT_EXT = 0x80000000ULL;

// Provided by VK_KHR_maintenance5
// Equivalent to VkBufferUsageFlagBits2
typedef VkBufferUsageFlagBits2 VkBufferUsageFlagBits2KHR;

* 
[VK_BUFFER_USAGE_2_TRANSFER_SRC_BIT](#VkBufferUsageFlagBits2KHR) specifies that the buffer **can**
be used as the source of a *transfer command* (see the definition of
[](synchronization.html#synchronization-pipeline-stages-transfer)[VK_PIPELINE_STAGE_TRANSFER_BIT](synchronization.html#VkPipelineStageFlagBits)).

* 
[VK_BUFFER_USAGE_2_TRANSFER_DST_BIT](#VkBufferUsageFlagBits2KHR) specifies that the buffer **can**
be used as the destination of a transfer command.

* 
[VK_BUFFER_USAGE_2_UNIFORM_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits2KHR) specifies that the
buffer **can** be used to create a `VkBufferView` suitable for
occupying a `VkDescriptorSet` slot of type
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType).

* 
[VK_BUFFER_USAGE_2_STORAGE_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits2KHR) specifies that the
buffer **can** be used to create a `VkBufferView` suitable for
occupying a `VkDescriptorSet` slot of type
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType).

* 
[VK_BUFFER_USAGE_2_UNIFORM_BUFFER_BIT](#VkBufferUsageFlagBits2KHR) specifies that the buffer
**can** be used in a `VkDescriptorBufferInfo` suitable for occupying a
`VkDescriptorSet` slot either of type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType).

* 
[VK_BUFFER_USAGE_2_STORAGE_BUFFER_BIT](#VkBufferUsageFlagBits2KHR) specifies that the buffer
**can** be used in a `VkDescriptorBufferInfo` suitable for occupying a
`VkDescriptorSet` slot either of type
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType).

* 
[VK_BUFFER_USAGE_2_INDEX_BUFFER_BIT](#VkBufferUsageFlagBits2KHR) specifies that the buffer is
    suitable for passing as the `buffer` parameter to
[vkCmdBindIndexBuffer2](drawing.html#vkCmdBindIndexBuffer2) and
    [vkCmdBindIndexBuffer](drawing.html#vkCmdBindIndexBuffer).

* 
[VK_BUFFER_USAGE_2_VERTEX_BUFFER_BIT](#VkBufferUsageFlagBits2KHR) specifies that the buffer is
suitable for passing as an element of the `pBuffers` array to
[vkCmdBindVertexBuffers](fxvertex.html#vkCmdBindVertexBuffers).

* 
[VK_BUFFER_USAGE_2_INDIRECT_BUFFER_BIT](#VkBufferUsageFlagBits2KHR) specifies that the buffer is
suitable for passing as the `buffer` parameter to
[vkCmdDrawIndirect](drawing.html#vkCmdDrawIndirect), [vkCmdDrawIndexedIndirect](drawing.html#vkCmdDrawIndexedIndirect),
[vkCmdDrawMeshTasksIndirectNV](drawing.html#vkCmdDrawMeshTasksIndirectNV),
[vkCmdDrawMeshTasksIndirectCountNV](drawing.html#vkCmdDrawMeshTasksIndirectCountNV),
`vkCmdDrawMeshTasksIndirectEXT`,
`vkCmdDrawMeshTasksIndirectCountEXT`,
[vkCmdDrawClusterIndirectHUAWEI](drawing.html#vkCmdDrawClusterIndirectHUAWEI),
or [vkCmdDispatchIndirect](dispatch.html#vkCmdDispatchIndirect).
It is also suitable for passing as the `buffer` member of
`VkIndirectCommandsStreamNV`, or `sequencesCountBuffer` or
`sequencesIndexBuffer` or `preprocessedBuffer` member of
`VkGeneratedCommandsInfoNV`.
It is also suitable for passing as the underlying buffer of either the
`preprocessAddress` or `sequenceCountAddress` members of
`VkGeneratedCommandsInfoEXT`.

* 
[VK_BUFFER_USAGE_2_CONDITIONAL_RENDERING_BIT_EXT](#VkBufferUsageFlagBits2KHR) specifies that the
buffer is suitable for passing as the `buffer` parameter to
[vkCmdBeginConditionalRenderingEXT](drawing.html#vkCmdBeginConditionalRenderingEXT).

* 
[VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](#VkBufferUsageFlagBits2KHR) specifies that
the buffer is suitable for using for binding as a transform feedback
buffer with
[vkCmdBindTransformFeedbackBuffers2EXT](vertexpostproc.html#vkCmdBindTransformFeedbackBuffers2EXT) or
[vkCmdBindTransformFeedbackBuffersEXT](vertexpostproc.html#vkCmdBindTransformFeedbackBuffersEXT).

* 
[VK_BUFFER_USAGE_2_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](#VkBufferUsageFlagBits2KHR)
specifies that the buffer is suitable for using as a counter buffer with
[vkCmdBeginTransformFeedback2EXT](vertexpostproc.html#vkCmdBeginTransformFeedback2EXT),
[vkCmdEndTransformFeedback2EXT](vertexpostproc.html#vkCmdEndTransformFeedback2EXT),
[vkCmdBeginTransformFeedbackEXT](vertexpostproc.html#vkCmdBeginTransformFeedbackEXT), and
[vkCmdEndTransformFeedbackEXT](vertexpostproc.html#vkCmdEndTransformFeedbackEXT).

* 
[VK_BUFFER_USAGE_2_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits2KHR) specifies that
the buffer is suitable to contain sampler and combined image sampler
descriptors when bound as a descriptor buffer.
Buffers containing combined image sampler descriptors **must** also specify
[VK_BUFFER_USAGE_2_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits2KHR).

* 
[VK_BUFFER_USAGE_2_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits2KHR) specifies
that the buffer is suitable to contain resource descriptors when bound
as a descriptor buffer.

* 
[VK_BUFFER_USAGE_2_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits2KHR)
specifies that the buffer, when bound, **can** be used by the
implementation to support push descriptors when using descriptor
buffers.

* 
[VK_BUFFER_USAGE_2_TILE_MEMORY_BIT_QCOM](#VkBufferUsageFlagBits2KHR) specifies that the buffer
**can** be bound to `VkDeviceMemory` allocated from a
[VkMemoryHeap](memory.html#VkMemoryHeap) with the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits)
property.

* 
[VK_BUFFER_USAGE_2_RAY_TRACING_BIT_NV](#VkBufferUsageFlagBits2KHR) specifies that the buffer is
suitable for use in [vkCmdTraceRaysNV](raytracing.html#vkCmdTraceRaysNV).

* 
[VK_BUFFER_USAGE_2_SHADER_BINDING_TABLE_BIT_KHR](#VkBufferUsageFlagBits2KHR) specifies that the
buffer is suitable for use as a [Shader Binding    Table](raytracing.html#shader-binding-table).

* 
[VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](#VkBufferUsageFlagBits2KHR)
specifies that the buffer is suitable for use as a read-only input to an
[acceleration structure build](accelstructures.html#acceleration-structure-building).

* 
[VK_BUFFER_USAGE_2_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](#VkBufferUsageFlagBits2KHR) specifies
that the buffer is suitable for storage space for a
[VkAccelerationStructureKHR](#VkAccelerationStructureKHR).

* 
[VK_BUFFER_USAGE_2_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits2KHR) specifies that the
buffer **can** be used to retrieve a buffer device address via
[vkGetBufferDeviceAddress](#vkGetBufferDeviceAddress) and use that address to access the
buffer’s memory from a shader.

* 
[VK_BUFFER_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR](#VkBufferUsageFlagBits2KHR) specifies that the
buffer **can** be used as the source video bitstream buffer in a
[video decode operation](videocoding.html#video-decode-operations).

* 
[VK_BUFFER_USAGE_2_VIDEO_DECODE_DST_BIT_KHR](#VkBufferUsageFlagBits2KHR) is reserved for future
use.

* 
[VK_BUFFER_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR](#VkBufferUsageFlagBits2KHR) specifies that the
buffer **can** be used as the destination video bitstream buffer in a
[video encode operation](videocoding.html#video-encode-operations).

* 
[VK_BUFFER_USAGE_2_VIDEO_ENCODE_SRC_BIT_KHR](#VkBufferUsageFlagBits2KHR) is reserved for future
use.

* 
[VK_BUFFER_USAGE_2_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](#VkBufferUsageFlagBits2KHR) specifies that
the buffer **can** be used for as scratch memory for
[execution graph dispatch](executiongraphs.html#executiongraphs).

* 
[VK_BUFFER_USAGE_2_PREPROCESS_BUFFER_BIT_EXT](#VkBufferUsageFlagBits2KHR) specifies that the
buffer **can** be used as a preprocess buffer for
[Device-Generated Commands](device_generated_commands/generatedcommands.html#device-generated-commands).

* 
[VK_BUFFER_USAGE_2_COMPRESSED_DATA_DGF1_BIT_AMDX](#VkBufferUsageFlagBits2KHR) specifies that the
buffer is suitable as storage space for [Dense    Geometry Format](VK_AMDX_dense_geometry_format/dense_geometry_format.html#dense-geometry-format) data.

* 
[VK_BUFFER_USAGE_2_DATA_GRAPH_FOREIGN_DESCRIPTOR_BIT_ARM](#VkBufferUsageFlagBits2KHR) specifies
that the buffer is suitable to contain resource descriptors when bound
as a descriptor buffer in command buffers allocated from a command pool
that **can** target foreign [data graph    processing engines](VK_ARM_data_graph/graphs.html#graphs-processing-engines).

* 
[VK_BUFFER_USAGE_2_MEMORY_DECOMPRESSION_BIT_EXT](#VkBufferUsageFlagBits2KHR) specifies that the
buffer **can** be used as a destination buffer in [    memory decompression](memory_decompression.html#memory-decompression).

* 
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkBufferUsageFlagBits2KHR) specifies that the
buffer **can** be used as a [descriptor heap](descriptorheaps.html#descriptorheaps).

// Provided by VK_VERSION_1_4
typedef VkFlags64 VkBufferUsageFlags2;

// Provided by VK_KHR_maintenance5
// Equivalent to VkBufferUsageFlags2
typedef VkBufferUsageFlags2 VkBufferUsageFlags2KHR;

`VkBufferUsageFlags2` is a bitmask type for setting a mask of zero or
more [VkBufferUsageFlagBits2](#VkBufferUsageFlagBits2).

Bits which **can** be set in [VkBufferCreateInfo](#VkBufferCreateInfo)::`usage`, specifying
usage behavior of a buffer, are:

|  | This functionality is superseded by [VkBufferUsageFlagBits2](#VkBufferUsageFlagBits2). See [Legacy Functionality](../appendices/legacy.html#legacy-flagbits) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef enum VkBufferUsageFlagBits {
    VK_BUFFER_USAGE_TRANSFER_SRC_BIT = 0x00000001,
    VK_BUFFER_USAGE_TRANSFER_DST_BIT = 0x00000002,
    VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT = 0x00000004,
    VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT = 0x00000008,
    VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT = 0x00000010,
    VK_BUFFER_USAGE_STORAGE_BUFFER_BIT = 0x00000020,
    VK_BUFFER_USAGE_INDEX_BUFFER_BIT = 0x00000040,
    VK_BUFFER_USAGE_VERTEX_BUFFER_BIT = 0x00000080,
    VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT = 0x00000100,
  // Provided by VK_VERSION_1_2
    VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT = 0x00020000,
  // Provided by VK_KHR_video_decode_queue
    VK_BUFFER_USAGE_VIDEO_DECODE_SRC_BIT_KHR = 0x00002000,
  // Provided by VK_KHR_video_decode_queue
    VK_BUFFER_USAGE_VIDEO_DECODE_DST_BIT_KHR = 0x00004000,
  // Provided by VK_EXT_transform_feedback
    VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT = 0x00000800,
  // Provided by VK_EXT_transform_feedback
    VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT = 0x00001000,
  // Provided by VK_EXT_conditional_rendering
    VK_BUFFER_USAGE_CONDITIONAL_RENDERING_BIT_EXT = 0x00000200,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_shader_enqueue
    VK_BUFFER_USAGE_EXECUTION_GRAPH_SCRATCH_BIT_AMDX = 0x02000000,
#endif
  // Provided by VK_EXT_descriptor_heap
    VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT = 0x10000000,
  // Provided by VK_KHR_acceleration_structure
    VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR = 0x00080000,
  // Provided by VK_KHR_acceleration_structure
    VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR = 0x00100000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR = 0x00000400,
  // Provided by VK_KHR_video_encode_queue
    VK_BUFFER_USAGE_VIDEO_ENCODE_DST_BIT_KHR = 0x00008000,
  // Provided by VK_KHR_video_encode_queue
    VK_BUFFER_USAGE_VIDEO_ENCODE_SRC_BIT_KHR = 0x00010000,
  // Provided by VK_EXT_descriptor_buffer
    VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT = 0x00200000,
  // Provided by VK_EXT_descriptor_buffer
    VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT = 0x00400000,
  // Provided by VK_EXT_descriptor_buffer
    VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT = 0x04000000,
  // Provided by VK_EXT_opacity_micromap
    VK_BUFFER_USAGE_MICROMAP_BUILD_INPUT_READ_ONLY_BIT_EXT = 0x00800000,
  // Provided by VK_EXT_opacity_micromap
    VK_BUFFER_USAGE_MICROMAP_STORAGE_BIT_EXT = 0x01000000,
  // Provided by VK_QCOM_tile_memory_heap
    VK_BUFFER_USAGE_TILE_MEMORY_BIT_QCOM = 0x08000000,
  // Provided by VK_NV_ray_tracing
    VK_BUFFER_USAGE_RAY_TRACING_BIT_NV = VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR,
  // Provided by VK_EXT_buffer_device_address
    VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT_EXT = VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT,
  // Provided by VK_KHR_buffer_device_address
    VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT_KHR = VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT,
} VkBufferUsageFlagBits;

* 
[VK_BUFFER_USAGE_TRANSFER_SRC_BIT](#VkBufferUsageFlagBits) specifies that the buffer **can** be
used as the source of a *transfer command* (see the definition of
[](synchronization.html#synchronization-pipeline-stages-transfer)[VK_PIPELINE_STAGE_TRANSFER_BIT](synchronization.html#VkPipelineStageFlagBits)).

* 
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](#VkBufferUsageFlagBits) specifies that the buffer **can** be
used as the destination of a transfer command.

* 
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits) specifies that the buffer
**can** be used to create a `VkBufferView` suitable for occupying a
`VkDescriptorSet` slot of type
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType).

* 
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits) specifies that the buffer
**can** be used to create a `VkBufferView` suitable for occupying a
`VkDescriptorSet` slot of type
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType).

* 
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](#VkBufferUsageFlagBits) specifies that the buffer **can**
be used in a `VkDescriptorBufferInfo` suitable for occupying a
`VkDescriptorSet` slot either of type
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType).

* 
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](#VkBufferUsageFlagBits) specifies that the buffer **can**
be used in a `VkDescriptorBufferInfo` suitable for occupying a
`VkDescriptorSet` slot either of type
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptorsets.html#VkDescriptorType).

* 
[VK_BUFFER_USAGE_INDEX_BUFFER_BIT](#VkBufferUsageFlagBits) specifies that the buffer is
    suitable for passing as the `buffer` parameter to
[vkCmdBindIndexBuffer2](drawing.html#vkCmdBindIndexBuffer2) and
    [vkCmdBindIndexBuffer](drawing.html#vkCmdBindIndexBuffer).

* 
[VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](#VkBufferUsageFlagBits) specifies that the buffer is
suitable for passing as an element of the `pBuffers` array to
[vkCmdBindVertexBuffers](fxvertex.html#vkCmdBindVertexBuffers).

* 
[VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT](#VkBufferUsageFlagBits) specifies that the buffer is
suitable for passing as the `buffer` parameter to
[vkCmdDrawIndirect](drawing.html#vkCmdDrawIndirect), [vkCmdDrawIndexedIndirect](drawing.html#vkCmdDrawIndexedIndirect),
[vkCmdDrawMeshTasksIndirectNV](drawing.html#vkCmdDrawMeshTasksIndirectNV),
[vkCmdDrawMeshTasksIndirectCountNV](drawing.html#vkCmdDrawMeshTasksIndirectCountNV),
`vkCmdDrawMeshTasksIndirectEXT`,
`vkCmdDrawMeshTasksIndirectCountEXT`,
[vkCmdDrawClusterIndirectHUAWEI](drawing.html#vkCmdDrawClusterIndirectHUAWEI),
or [vkCmdDispatchIndirect](dispatch.html#vkCmdDispatchIndirect).
It is also suitable for passing as the `buffer` member of
`VkIndirectCommandsStreamNV`, or `sequencesCountBuffer` or
`sequencesIndexBuffer` or `preprocessedBuffer` member of
`VkGeneratedCommandsInfoNV`.
It is also suitable for passing as the underlying buffer of either the
`preprocessAddress` or `sequenceCountAddress` members of
`VkGeneratedCommandsInfoEXT`.

* 
[VK_BUFFER_USAGE_CONDITIONAL_RENDERING_BIT_EXT](#VkBufferUsageFlagBits) specifies that the
buffer is suitable for passing as the `buffer` parameter to
[vkCmdBeginConditionalRenderingEXT](drawing.html#vkCmdBeginConditionalRenderingEXT).

* 
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](#VkBufferUsageFlagBits) specifies that
the buffer is suitable for using for binding as a transform feedback
buffer with
[vkCmdBindTransformFeedbackBuffers2EXT](vertexpostproc.html#vkCmdBindTransformFeedbackBuffers2EXT) or
[vkCmdBindTransformFeedbackBuffersEXT](vertexpostproc.html#vkCmdBindTransformFeedbackBuffersEXT).

* 
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_COUNTER_BUFFER_BIT_EXT](#VkBufferUsageFlagBits)
specifies that the buffer is suitable for using as a counter buffer with
[vkCmdBeginTransformFeedback2EXT](vertexpostproc.html#vkCmdBeginTransformFeedback2EXT),
[vkCmdEndTransformFeedback2EXT](vertexpostproc.html#vkCmdEndTransformFeedback2EXT),
[vkCmdBeginTransformFeedbackEXT](vertexpostproc.html#vkCmdBeginTransformFeedbackEXT), and
[vkCmdEndTransformFeedbackEXT](vertexpostproc.html#vkCmdEndTransformFeedbackEXT).

* 
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits) specifies that
the buffer is suitable to contain sampler and combined image sampler
descriptors when bound as a descriptor buffer.
Buffers containing combined image sampler descriptors **must** also specify
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits).

* 
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits) specifies that
the buffer is suitable to contain resource descriptors when bound as a
descriptor buffer.

* 
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](#VkBufferUsageFlagBits)
specifies that the buffer, when bound, **can** be used by the
implementation to support push descriptors when using descriptor
buffers.

* 
[VK_BUFFER_USAGE_TILE_MEMORY_BIT_QCOM](#VkBufferUsageFlagBits) specifies that the buffer
**can** be bound to `VkDeviceMemory` allocated from a
[VkMemoryHeap](memory.html#VkMemoryHeap) with the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits)
property.

* 
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](#VkBufferUsageFlagBits) specifies that the buffer is
suitable for use in [vkCmdTraceRaysNV](raytracing.html#vkCmdTraceRaysNV).

* 
[VK_BUFFER_USAGE_SHADER_BINDING_TABLE_BIT_KHR](#VkBufferUsageFlagBits) specifies that the
buffer is suitable for use as a [Shader Binding    Table](raytracing.html#shader-binding-table).

* 
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_BUILD_INPUT_READ_ONLY_BIT_KHR](#VkBufferUsageFlagBits)
specifies that the buffer is suitable for use as a read-only input to an
[acceleration structure build](accelstructures.html#acceleration-structure-building).

* 
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](#VkBufferUsageFlagBits) specifies
that the buffer is suitable for storage space for a
[VkAccelerationStructureKHR](#VkAccelerationStructureKHR).

* 
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits) specifies that the
buffer **can** be used to retrieve a buffer device address via
[vkGetBufferDeviceAddress](#vkGetBufferDeviceAddress) and use that address to access the
buffer’s memory from a shader.

* 
[VK_BUFFER_USAGE_VIDEO_DECODE_SRC_BIT_KHR](#VkBufferUsageFlagBits) specifies that the buffer
**can** be used as the source video bitstream buffer in a
[video decode operation](videocoding.html#video-decode-operations).

* 
[VK_BUFFER_USAGE_VIDEO_DECODE_DST_BIT_KHR](#VkBufferUsageFlagBits) is reserved for future
use.

* 
[VK_BUFFER_USAGE_VIDEO_ENCODE_DST_BIT_KHR](#VkBufferUsageFlagBits) specifies that the buffer
**can** be used as the destination video bitstream buffer in a
[video encode operation](videocoding.html#video-encode-operations).

* 
[VK_BUFFER_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](#VkBufferUsageFlagBits) is reserved for future
use.

* 
[VK_BUFFER_USAGE_EXECUTION_GRAPH_SCRATCH_BIT_AMDX](#VkBufferUsageFlagBits) specifies that
the buffer **can** be used for as scratch memory for
[execution graph dispatch](executiongraphs.html#executiongraphs).

* 
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](#VkBufferUsageFlagBits) specifies that the buffer
**can** be used as a [descriptor heap](descriptorheaps.html#descriptorheaps).

|  | This functionality is superseded by [VkBufferUsageFlags2](#VkBufferUsageFlags2). See [Legacy Functionality](../appendices/legacy.html#legacy-flagbits) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef VkFlags VkBufferUsageFlags;

`VkBufferUsageFlags` is a bitmask type for setting a mask of zero or
more [VkBufferUsageFlagBits](#VkBufferUsageFlagBits).

Bits which **can** be set in [VkBufferCreateInfo](#VkBufferCreateInfo)::`flags`, specifying
additional parameters of a buffer, are:

// Provided by VK_VERSION_1_0
typedef enum VkBufferCreateFlagBits {
    VK_BUFFER_CREATE_SPARSE_BINDING_BIT = 0x00000001,
    VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT = 0x00000002,
    VK_BUFFER_CREATE_SPARSE_ALIASED_BIT = 0x00000004,
  // Provided by VK_VERSION_1_1
    VK_BUFFER_CREATE_PROTECTED_BIT = 0x00000008,
  // Provided by VK_VERSION_1_2
    VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT = 0x00000010,
  // Provided by VK_EXT_descriptor_buffer
    VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT = 0x00000020,
  // Provided by VK_KHR_video_maintenance1
    VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR = 0x00000040,
  // Provided by VK_EXT_buffer_device_address
    VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT = VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT,
  // Provided by VK_KHR_buffer_device_address
    VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR = VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT,
} VkBufferCreateFlagBits;

* 
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits) specifies that the buffer will
be backed using sparse memory binding.

* 
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#VkBufferCreateFlagBits) specifies that the buffer
**can** be partially backed using sparse memory binding.
Buffers created with this flag **must** also be created with the
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits) flag.

* 
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](#VkBufferCreateFlagBits) specifies that the buffer will
be backed using sparse memory binding with memory ranges that might also
simultaneously be backing another buffer (or another portion of the same
buffer).
Buffers created with this flag **must** also be created with the
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits) flag.

* 
[VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits) specifies that the buffer is a
protected buffer.

* 
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits) specifies that
the buffer’s address **can** be saved and reused on a subsequent run (e.g.
for trace capture and replay), see
[VkBufferOpaqueCaptureAddressCreateInfo](#VkBufferOpaqueCaptureAddressCreateInfo) for more detail.

* 
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkBufferCreateFlagBits)
specifies that the buffer **can** be used with descriptor buffers when
capturing and replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) for more detail.

* 
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkBufferCreateFlagBits) specifies that
the buffer **can** be used in [video coding operations](videocoding.html#video-coding)
without having to specify at buffer creation time the set of video
profiles the buffer will be used with.

See [Sparse Resource Features](sparsemem.html#sparsememory-sparseresourcefeatures) and
[Physical Device Features](features.html#features) for details of the sparse memory
features supported on a device.

// Provided by VK_VERSION_1_0
typedef VkFlags VkBufferCreateFlags;

`VkBufferCreateFlags` is a bitmask type for setting a mask of zero or
more [VkBufferCreateFlagBits](#VkBufferCreateFlagBits).

If the `pNext` chain includes a
`VkDedicatedAllocationBufferCreateInfoNV` structure, then that structure
includes an enable controlling whether the buffer will have a dedicated
memory allocation bound to it.

The `VkDedicatedAllocationBufferCreateInfoNV` structure is defined as:

// Provided by VK_NV_dedicated_allocation
typedef struct VkDedicatedAllocationBufferCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           dedicatedAllocation;
} VkDedicatedAllocationBufferCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dedicatedAllocation` specifies whether the buffer will have a
dedicated allocation bound to it.

Valid Usage (Implicit)

* 
[](#VUID-VkDedicatedAllocationBufferCreateInfoNV-sType-sType) VUID-VkDedicatedAllocationBufferCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_BUFFER_CREATE_INFO_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](#VkBufferCreateInfo)

To define a set of external memory handle types that **may** be used as backing
store for a buffer, add a [VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo) structure
to the `pNext` chain of the [VkBufferCreateInfo](#VkBufferCreateInfo) structure.
The `VkExternalMemoryBufferCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalMemoryBufferCreateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    VkExternalMemoryHandleTypeFlags    handleTypes;
} VkExternalMemoryBufferCreateInfo;

// Provided by VK_KHR_external_memory
// Equivalent to VkExternalMemoryBufferCreateInfo
typedef VkExternalMemoryBufferCreateInfo VkExternalMemoryBufferCreateInfoKHR;

|  | A `VkExternalMemoryBufferCreateInfo` structure with a non-zero
| --- | --- |
`handleTypes` field must be included in the creation parameters for a
buffer that will be bound to memory that is either exported or imported. |

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is zero or a bitmask of
[VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) specifying one or more external
memory handle types.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalMemoryBufferCreateInfo-sType-sType) VUID-VkExternalMemoryBufferCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_BUFFER_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExternalMemoryBufferCreateInfo-handleTypes-parameter) VUID-VkExternalMemoryBufferCreateInfo-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](#VkBufferCreateInfo)

To request a specific device address for a buffer, add a
[VkBufferOpaqueCaptureAddressCreateInfo](#VkBufferOpaqueCaptureAddressCreateInfo) structure to the `pNext`
chain of the [VkBufferCreateInfo](#VkBufferCreateInfo) structure.
The `VkBufferOpaqueCaptureAddressCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkBufferOpaqueCaptureAddressCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           opaqueCaptureAddress;
} VkBufferOpaqueCaptureAddressCreateInfo;

// Provided by VK_KHR_buffer_device_address
// Equivalent to VkBufferOpaqueCaptureAddressCreateInfo
typedef VkBufferOpaqueCaptureAddressCreateInfo VkBufferOpaqueCaptureAddressCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`opaqueCaptureAddress` is the opaque capture address requested for
the buffer.

If `opaqueCaptureAddress` is zero, no specific address is requested.

If `opaqueCaptureAddress` is not zero, then it **should** be an address
retrieved from [vkGetBufferOpaqueCaptureAddress](#vkGetBufferOpaqueCaptureAddress) for an identically
created buffer on the same implementation.

If this structure is not present, it is as if `opaqueCaptureAddress` is
zero.

Applications **should** avoid creating buffers with application-provided
addresses and implementation-provided addresses in the same process, to
reduce the likelihood of [VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](fundamentals.html#VkResult)
errors.

|  | The expected usage for this is that a trace capture/replay tool will add the
| --- | --- |
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits) flag to all buffers
that use [VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits), and during capture
will save the queried opaque device addresses in the trace.
During replay, the buffers will be created specifying the original address
so any address values stored in the trace data will remain valid.

Implementations are expected to separate such buffers in the GPU address
space so normal allocations will avoid using these addresses.
Applications and tools should avoid mixing application-provided and
implementation-provided addresses for buffers created with
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits), to avoid address
space allocation conflicts. |

Valid Usage (Implicit)

* 
[](#VUID-VkBufferOpaqueCaptureAddressCreateInfo-sType-sType) VUID-VkBufferOpaqueCaptureAddressCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_OPAQUE_CAPTURE_ADDRESS_CREATE_INFO](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](#VkBufferCreateInfo)

To request a specific device address for a buffer, add a
`VkBufferDeviceAddressCreateInfoEXT` structure to the `pNext` chain
of the [VkBufferCreateInfo](#VkBufferCreateInfo) structure.
The `VkBufferDeviceAddressCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_buffer_device_address
typedef struct VkBufferDeviceAddressCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceAddress    deviceAddress;
} VkBufferDeviceAddressCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceAddress` is the device address requested for the buffer.

If `deviceAddress` is zero, no specific address is requested.

If `deviceAddress` is not zero, then it **must** be an address retrieved
from an identically created buffer on the same implementation.
The buffer **must** also be bound to an identically created
`VkDeviceMemory` object.

If this structure is not present, it is as if `deviceAddress` is zero.

Applications **should** avoid creating buffers with application-provided
addresses and implementation-provided addresses in the same process, to
reduce the likelihood of [VK_ERROR_INVALID_DEVICE_ADDRESS_EXT](fundamentals.html#VkResult) errors.

Valid Usage (Implicit)

* 
[](#VUID-VkBufferDeviceAddressCreateInfoEXT-sType-sType) VUID-VkBufferDeviceAddressCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferDeviceAddressCreateInfoEXT-deviceAddress-parameter) VUID-VkBufferDeviceAddressCreateInfoEXT-deviceAddress-parameter

 If `deviceAddress` is not `0`, `deviceAddress` **must** be a valid `VkDeviceAddress` value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](#VkBufferCreateInfo)

The `VkBufferCollectionBufferCreateInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferCollectionBufferCreateInfoFUCHSIA {
    VkStructureType              sType;
    const void*                  pNext;
    VkBufferCollectionFUCHSIA    collection;
    uint32_t                     index;
} VkBufferCollectionBufferCreateInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`collection` is the [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
`index` is the index of the buffer in the buffer collection from
which the memory will be imported

Valid Usage

* 
[](#VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-index-06388) VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-index-06388

`index` **must** be less than
[VkBufferCollectionPropertiesFUCHSIA](#VkBufferCollectionPropertiesFUCHSIA)::`bufferCount`

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-sType-sType) VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COLLECTION_BUFFER_CREATE_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-collection-parameter) VUID-VkBufferCollectionBufferCreateInfoFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferCreateInfo](#VkBufferCreateInfo)

To destroy a buffer, call:

// Provided by VK_VERSION_1_0
void vkDestroyBuffer(
    VkDevice                                    device,
    VkBuffer                                    buffer,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the buffer.

* 
`buffer` is the buffer to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyBuffer-buffer-00922) VUID-vkDestroyBuffer-buffer-00922

All submitted commands that refer to `buffer`, either directly or
via a `VkBufferView`, **must** have completed execution

* 
[](#VUID-vkDestroyBuffer-buffer-00923) VUID-vkDestroyBuffer-buffer-00923

If `VkAllocationCallbacks` were provided when `buffer` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyBuffer-buffer-00924) VUID-vkDestroyBuffer-buffer-00924

If no `VkAllocationCallbacks` were provided when `buffer` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyBuffer-device-parameter) VUID-vkDestroyBuffer-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyBuffer-buffer-parameter) VUID-vkDestroyBuffer-buffer-parameter

 If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `buffer` **must** be a valid [VkBuffer](#VkBuffer) handle

* 
[](#VUID-vkDestroyBuffer-pAllocator-parameter) VUID-vkDestroyBuffer-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyBuffer-buffer-parent) VUID-vkDestroyBuffer-buffer-parent

 If `buffer` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `buffer` **must** be externally synchronized

A *buffer view* represents a contiguous range of a buffer and a specific
format to be used to interpret the data.
Buffer views are used to enable shaders to access buffer contents using
[image operations](textures.html#textures).
In order to create a valid buffer view, the buffer **must** have been created
with at least one of the following usage flags:

* 
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits)

* 
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits)

Buffer views are represented by `VkBufferView` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkBufferView)

To create a buffer view, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateBufferView(
    VkDevice                                    device,
    const VkBufferViewCreateInfo*               pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkBufferView*                               pView);

* 
`device` is the logical device that creates the buffer view.

* 
`pCreateInfo` is a pointer to a [VkBufferViewCreateInfo](#VkBufferViewCreateInfo)
structure containing parameters to be used to create the buffer view.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pView` is a pointer to a [VkBufferView](#VkBufferView) handle in which the
resulting buffer view object is returned.

Valid Usage

* 
[](#VUID-vkCreateBufferView-device-09665) VUID-vkCreateBufferView-device-09665

`device` **must** support at least one queue family with one of the
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits) or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capabilities

Valid Usage (Implicit)

* 
[](#VUID-vkCreateBufferView-device-parameter) VUID-vkCreateBufferView-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateBufferView-pCreateInfo-parameter) VUID-vkCreateBufferView-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkBufferViewCreateInfo](#VkBufferViewCreateInfo) structure

* 
[](#VUID-vkCreateBufferView-pAllocator-parameter) VUID-vkCreateBufferView-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateBufferView-pView-parameter) VUID-vkCreateBufferView-pView-parameter

 `pView` **must** be a valid pointer to a [VkBufferView](#VkBufferView) handle

* 
[](#VUID-vkCreateBufferView-device-queuecount) VUID-vkCreateBufferView-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkBufferViewCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkBufferViewCreateInfo {
    VkStructureType            sType;
    const void*                pNext;
    VkBufferViewCreateFlags    flags;
    VkBuffer                   buffer;
    VkFormat                   format;
    VkDeviceSize               offset;
    VkDeviceSize               range;
} VkBufferViewCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`buffer` is a [VkBuffer](#VkBuffer) on which the view will be created.

* 
`format` is a [VkFormat](formats.html#VkFormat) describing the format of the data
elements in the buffer.

* 
`offset` is an offset in bytes from the base address of the buffer.
Accesses to the buffer view from shaders use addressing that is relative
to this starting offset.

* 
`range` is a size in bytes of the buffer view.
If `range` is equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), the range from
`offset` to the end of the buffer is used.
If [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) is used and the remaining size of the buffer is
not a multiple of the [texel block size](formats.html#texel-block-size) of
`format`, the nearest smaller multiple is used.

The buffer view has a *buffer view usage* identifying which descriptor types
can be created from it.
This usage
**can** be defined by including the [VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo)
structure in the `pNext` chain, and specifying the `usage` value
there.
If this structure is not included, it
is equal to the [VkBufferCreateInfo](#VkBufferCreateInfo)::`usage` value used to create
`buffer`.

Valid Usage

* 
[](#VUID-VkBufferViewCreateInfo-offset-00925) VUID-VkBufferViewCreateInfo-offset-00925

`offset` **must** be less than the size of `buffer`

* 
[](#VUID-VkBufferViewCreateInfo-range-00928) VUID-VkBufferViewCreateInfo-range-00928

If `range` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `range` **must** be
greater than `0`

* 
[](#VUID-VkBufferViewCreateInfo-range-00929) VUID-VkBufferViewCreateInfo-range-00929

If `range` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `range` **must** be
an integer multiple of the texel block size of `format`

* 
[](#VUID-VkBufferViewCreateInfo-range-00930) VUID-VkBufferViewCreateInfo-range-00930

If `range` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), the number of texel
buffer elements given by (⌊`range` / (texel block
size)⌋ × (texels per block)) where texel block size and
texels per block are as defined in the [    Compatible Formats](formats.html#formats-compatibility) table for `format`, **must** be less than or equal
to `VkPhysicalDeviceLimits`::`maxTexelBufferElements`

* 
[](#VUID-VkBufferViewCreateInfo-offset-00931) VUID-VkBufferViewCreateInfo-offset-00931

If `range` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), the sum of
`offset` and `range` **must** be less than or equal to the size of
`buffer`

* 
[](#VUID-VkBufferViewCreateInfo-range-04059) VUID-VkBufferViewCreateInfo-range-04059

If `range` is equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), the number of texel
buffer elements given by (⌊(size - `offset`) / (texel
block size)⌋ × (texels per block)) where size is the size
of `buffer`, and texel block size and texels per block are as
defined in the [Compatible Formats](formats.html#formats-compatibility) table for
`format`, **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxTexelBufferElements`

* 
[](#VUID-VkBufferViewCreateInfo-buffer-00932) VUID-VkBufferViewCreateInfo-buffer-00932

`buffer` **must** have been created with at least one of the
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits) or
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits) usage flags set

* 
[](#VUID-VkBufferViewCreateInfo-format-08778) VUID-VkBufferViewCreateInfo-format-08778

If the [buffer view usage](#resources-buffer-views-usage) contains
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits), then
[format features](#resources-buffer-view-format-features) of
`format` **must** contain
[VK_FORMAT_FEATURE_UNIFORM_TEXEL_BUFFER_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkBufferViewCreateInfo-format-08779) VUID-VkBufferViewCreateInfo-format-08779

If the [buffer view usage](#resources-buffer-views-usage) contains
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits), then
[format features](#resources-buffer-view-format-features) of
`format` **must** contain
[VK_FORMAT_FEATURE_STORAGE_TEXEL_BUFFER_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkBufferViewCreateInfo-buffer-00935) VUID-VkBufferViewCreateInfo-buffer-00935

If `buffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-VkBufferViewCreateInfo-buffer-02750) VUID-VkBufferViewCreateInfo-buffer-02750

If `buffer` was created with the
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits) usage flag set,
`offset` **must** be a multiple of the effective alignment requirement
of `format` for [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) as
defined by
[`minTexelBufferOffsetAlignment`](limits.html#limits-minTexelBufferOffsetAlignment)

* 
[](#VUID-VkBufferViewCreateInfo-buffer-02751) VUID-VkBufferViewCreateInfo-buffer-02751

If `buffer` was created with the
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits) usage flag set,
`offset` **must** be a multiple of the effective alignment requirement
of `format` for [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptorsets.html#VkDescriptorType) as
defined by
[`minTexelBufferOffsetAlignment`](limits.html#limits-minTexelBufferOffsetAlignment)

* 
[](#VUID-VkBufferViewCreateInfo-pNext-06782) VUID-VkBufferViewCreateInfo-pNext-06782

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT) structure, its
`exportObjectType` member **must** be
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](memory.html#VkExportMetalObjectTypeFlagBitsEXT)

* 
[](#VUID-VkBufferViewCreateInfo-pNext-08780) VUID-VkBufferViewCreateInfo-pNext-08780

If the `pNext` chain includes a [VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo),
its `usage` **must** not contain any other bit than
[VK_BUFFER_USAGE_2_UNIFORM_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits2KHR) or
[VK_BUFFER_USAGE_2_STORAGE_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits2KHR)

* 
[](#VUID-VkBufferViewCreateInfo-pNext-08781) VUID-VkBufferViewCreateInfo-pNext-08781

If the `pNext` chain includes a [VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo),
its `usage` **must** be a subset of the
[VkBufferCreateInfo](#VkBufferCreateInfo)::`usage` specified or
[VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo)::`usage` from
[VkBufferCreateInfo](#VkBufferCreateInfo)::`pNext` when creating `buffer`

* 
[](#VUID-VkBufferViewCreateInfo-None-12278) VUID-VkBufferViewCreateInfo-None-12278

    If
Vulkan 1.3 is not supported and
    the [`ycbcr2plane444Formats`](features.html#features-ycbcr2plane444Formats)
    feature is not enabled, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](formats.html#VkFormat),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](formats.html#VkFormat)

Valid Usage (Implicit)

* 
[](#VUID-VkBufferViewCreateInfo-sType-sType) VUID-VkBufferViewCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_VIEW_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferViewCreateInfo-pNext-pNext) VUID-VkBufferViewCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBufferUsageFlags2CreateInfo](#VkBufferUsageFlags2CreateInfo) or [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT)

* 
[](#VUID-VkBufferViewCreateInfo-sType-unique) VUID-VkBufferViewCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT)

* 
[](#VUID-VkBufferViewCreateInfo-flags-zerobitmask) VUID-VkBufferViewCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkBufferViewCreateInfo-buffer-parameter) VUID-VkBufferViewCreateInfo-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](#VkBuffer) handle

* 
[](#VUID-VkBufferViewCreateInfo-format-parameter) VUID-VkBufferViewCreateInfo-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

// Provided by VK_VERSION_1_0
typedef VkFlags VkBufferViewCreateFlags;

`VkBufferViewCreateFlags` is a bitmask type for setting a mask, but is
currently reserved for future use.

To destroy a buffer view, call:

// Provided by VK_VERSION_1_0
void vkDestroyBufferView(
    VkDevice                                    device,
    VkBufferView                                bufferView,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the buffer view.

* 
`bufferView` is the buffer view to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyBufferView-bufferView-00936) VUID-vkDestroyBufferView-bufferView-00936

All submitted commands that refer to `bufferView` **must** have
completed execution

* 
[](#VUID-vkDestroyBufferView-bufferView-00937) VUID-vkDestroyBufferView-bufferView-00937

If `VkAllocationCallbacks` were provided when `bufferView` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyBufferView-bufferView-00938) VUID-vkDestroyBufferView-bufferView-00938

If no `VkAllocationCallbacks` were provided when `bufferView`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyBufferView-device-parameter) VUID-vkDestroyBufferView-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyBufferView-bufferView-parameter) VUID-vkDestroyBufferView-bufferView-parameter

 If `bufferView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `bufferView` **must** be a valid [VkBufferView](#VkBufferView) handle

* 
[](#VUID-vkDestroyBufferView-pAllocator-parameter) VUID-vkDestroyBufferView-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyBufferView-bufferView-parent) VUID-vkDestroyBufferView-bufferView-parent

 If `bufferView` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `bufferView` **must** be externally synchronized

Valid uses of a [VkBufferView](#VkBufferView) **may** depend on the buffer view’s *format
features*, defined below.
Such constraints are documented in the affected valid usage statement.

* 
If Vulkan 1.3 is supported or the `[VK_KHR_format_feature_flags2](../appendices/extensions.html#VK_KHR_format_feature_flags2)`
extension is supported, then the buffer view’s set of *format features*
is the value of [VkFormatProperties3](formats.html#VkFormatProperties3)::`bufferFeatures` found by
calling [vkGetPhysicalDeviceFormatProperties2](formats.html#vkGetPhysicalDeviceFormatProperties2) on the same
`format` as [VkBufferViewCreateInfo](#VkBufferViewCreateInfo)::`format`.

To query a 64-bit buffer device address value which can be used to identify
a buffer to API commands or through which buffer memory **can** be accessed,
call:

// Provided by VK_VERSION_1_2
VkDeviceAddress vkGetBufferDeviceAddress(
    VkDevice                                    device,
    const VkBufferDeviceAddressInfo*            pInfo);

// Provided by VK_KHR_buffer_device_address
// Equivalent to vkGetBufferDeviceAddress
VkDeviceAddress vkGetBufferDeviceAddressKHR(
    VkDevice                                    device,
    const VkBufferDeviceAddressInfo*            pInfo);

// Provided by VK_EXT_buffer_device_address
// Equivalent to vkGetBufferDeviceAddress
VkDeviceAddress vkGetBufferDeviceAddressEXT(
    VkDevice                                    device,
    const VkBufferDeviceAddressInfo*            pInfo);

* 
`device` is the logical device that the buffer was created on.

* 
`pInfo` is a pointer to a [VkBufferDeviceAddressInfo](#VkBufferDeviceAddressInfo) structure
specifying the buffer to retrieve an address for.

The 64-bit return value, `bufferBaseAddress`, is an address of the
start of `pInfo->buffer`.
Addresses in the range [`bufferBaseAddress`, `bufferBaseAddress`
+  [VkBufferCreateInfo](#VkBufferCreateInfo)::`size`) **can** be used to access the
memory bound to this buffer on the device.

A value of zero is reserved as a “null” pointer and **must** not be returned
as a valid buffer device address.

If the buffer was created with a non-zero value of
[VkBufferOpaqueCaptureAddressCreateInfo](#VkBufferOpaqueCaptureAddressCreateInfo)::`opaqueCaptureAddress` or
[VkBufferDeviceAddressCreateInfoEXT](#VkBufferDeviceAddressCreateInfoEXT)::`deviceAddress`,
the return value will be the same address that was returned at capture time.

The returned address **must** satisfy the alignment requirement specified by
[VkMemoryRequirements](#VkMemoryRequirements)::`alignment` for the buffer in
[VkBufferDeviceAddressInfo](#VkBufferDeviceAddressInfo)::`buffer`.

If multiple [VkBuffer](#VkBuffer) objects are bound to overlapping ranges of
[VkDeviceMemory](memory.html#VkDeviceMemory), implementations **may** return address ranges which
overlap.
In this case, it is ambiguous which [VkBuffer](#VkBuffer) is associated with any
given device address.
For purposes of valid usage, if multiple [VkBuffer](#VkBuffer) objects **can** be
attributed to a device address, a [VkBuffer](#VkBuffer) is selected such that valid
usage passes, if it exists.

Valid Usage

* 
[](#VUID-vkGetBufferDeviceAddress-bufferDeviceAddress-03324) VUID-vkGetBufferDeviceAddress-bufferDeviceAddress-03324

The [`bufferDeviceAddress`](features.html#features-bufferDeviceAddress) feature
or the [](features.html#features-bufferDeviceAddressEXT)[VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](features.html#VkPhysicalDeviceBufferDeviceAddressFeaturesEXT)::`bufferDeviceAddress`
feature
**must** be enabled, and at least one of the following conditions **must** be
met

`buffer` is sparse

* 
`buffer` is bound completely and contiguously to a single
`VkDeviceMemory` object

* 
`buffer` was created with the
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits) flag and the
[](features.html#features-bufferDeviceAddressEXT)[VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](features.html#VkPhysicalDeviceBufferDeviceAddressFeaturesEXT)::`bufferDeviceAddress`
feature is enabled on the device

[](#VUID-vkGetBufferDeviceAddress-device-03325) VUID-vkGetBufferDeviceAddress-device-03325

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice)
or [](features.html#features-bufferDeviceAddressMultiDeviceEXT)[VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](features.html#VkPhysicalDeviceBufferDeviceAddressFeaturesEXT)::`bufferDeviceAddressMultiDevice`
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferDeviceAddress-device-parameter) VUID-vkGetBufferDeviceAddress-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetBufferDeviceAddress-pInfo-parameter) VUID-vkGetBufferDeviceAddress-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkBufferDeviceAddressInfo](#VkBufferDeviceAddressInfo) structure

The `VkBufferDeviceAddressInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkBufferDeviceAddressInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           buffer;
} VkBufferDeviceAddressInfo;

// Provided by VK_KHR_buffer_device_address
// Equivalent to VkBufferDeviceAddressInfo
typedef VkBufferDeviceAddressInfo VkBufferDeviceAddressInfoKHR;

// Provided by VK_EXT_buffer_device_address
// Equivalent to VkBufferDeviceAddressInfo
typedef VkBufferDeviceAddressInfo VkBufferDeviceAddressInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` specifies the buffer whose address is being queried.

Valid Usage

* 
[](#VUID-VkBufferDeviceAddressInfo-buffer-02601) VUID-VkBufferDeviceAddressInfo-buffer-02601

`buffer` **must** have been created with the
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkBufferDeviceAddressInfo-sType-sType) VUID-VkBufferDeviceAddressInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferDeviceAddressInfo-pNext-pNext) VUID-VkBufferDeviceAddressInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBufferDeviceAddressInfo-buffer-parameter) VUID-VkBufferDeviceAddressInfo-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](#VkBuffer) handle

To query a 64-bit buffer opaque capture address, call:

// Provided by VK_VERSION_1_2
uint64_t vkGetBufferOpaqueCaptureAddress(
    VkDevice                                    device,
    const VkBufferDeviceAddressInfo*            pInfo);

// Provided by VK_KHR_buffer_device_address
// Equivalent to vkGetBufferOpaqueCaptureAddress
uint64_t vkGetBufferOpaqueCaptureAddressKHR(
    VkDevice                                    device,
    const VkBufferDeviceAddressInfo*            pInfo);

* 
`device` is the logical device that the buffer was created on.

* 
`pInfo` is a pointer to a [VkBufferDeviceAddressInfo](#VkBufferDeviceAddressInfo) structure
specifying the buffer to retrieve an address for.

The 64-bit return value is an opaque capture address of the start of
`pInfo->buffer`.

If the buffer was created with a non-zero value of
[VkBufferOpaqueCaptureAddressCreateInfo](#VkBufferOpaqueCaptureAddressCreateInfo)::`opaqueCaptureAddress` the
return value **must** be the same address.

Valid Usage

* 
[](#VUID-vkGetBufferOpaqueCaptureAddress-None-03326) VUID-vkGetBufferOpaqueCaptureAddress-None-03326

The [`bufferDeviceAddress`](features.html#features-bufferDeviceAddress) and
[    `bufferDeviceAddressCaptureReplay`](features.html#features-bufferDeviceAddressCaptureReplay) features **must** be enabled

* 
[](#VUID-vkGetBufferOpaqueCaptureAddress-pInfo-10725) VUID-vkGetBufferOpaqueCaptureAddress-pInfo-10725

`pInfo->buffer` **must** have been created with the
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits) flag

* 
[](#VUID-vkGetBufferOpaqueCaptureAddress-device-03327) VUID-vkGetBufferOpaqueCaptureAddress-device-03327

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferOpaqueCaptureAddress-device-parameter) VUID-vkGetBufferOpaqueCaptureAddress-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetBufferOpaqueCaptureAddress-pInfo-parameter) VUID-vkGetBufferOpaqueCaptureAddress-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkBufferDeviceAddressInfo](#VkBufferDeviceAddressInfo) structure

The `VkStridedDeviceAddressRegionKHR` structure is defined as:

// Provided by VK_KHR_ray_tracing_pipeline
typedef struct VkStridedDeviceAddressRegionKHR {
    VkDeviceAddress    deviceAddress;
    VkDeviceSize       stride;
    VkDeviceSize       size;
} VkStridedDeviceAddressRegionKHR;

* 
`deviceAddress` is the device address (as returned by the
[vkGetBufferDeviceAddress](#vkGetBufferDeviceAddress) command) at which the region starts, or
zero if the region is unused.

* 
`stride` is the byte stride between consecutive elements.

* 
`size` is the size in bytes of the region starting at
`deviceAddress`.

Valid Usage

* 
[](#VUID-VkStridedDeviceAddressRegionKHR-size-04631) VUID-VkStridedDeviceAddressRegionKHR-size-04631

If `size` is not zero, all addresses between `deviceAddress` and
`deviceAddress` +  `size` - 1 **must** be in the buffer
device address range of the same buffer

* 
[](#VUID-VkStridedDeviceAddressRegionKHR-size-04632) VUID-VkStridedDeviceAddressRegionKHR-size-04632

If `size` is not zero, `stride` **must** be less than or equal to
the size of the buffer from which `deviceAddress` was queried

Valid Usage (Implicit)

* 
[](#VUID-VkStridedDeviceAddressRegionKHR-deviceAddress-parameter) VUID-VkStridedDeviceAddressRegionKHR-deviceAddress-parameter

 If `deviceAddress` is not `0`, `deviceAddress` **must** be a valid `VkDeviceAddress` value

Images are specialized resources that have multi-dimensional access, as
outlined in the [Images](images.html#images) chapter.
Images **can** be used for various purposes, such as [rendering attachments](renderpass.html#renderpass), [for copy operations](copies.html#copies), or accessed through shaders
via [resource descriptors](descriptorsets.html#descriptors).

Images are represented by `VkImage` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkImage)

To create images, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateImage(
    VkDevice                                    device,
    const VkImageCreateInfo*                    pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkImage*                                    pImage);

* 
`device` is the logical device that creates the image.

* 
`pCreateInfo` is a pointer to a [VkImageCreateInfo](#VkImageCreateInfo) structure
containing parameters to be used to create the image.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pImage` is a pointer to a [VkImage](#VkImage) handle in which the
resulting image object is returned.

Valid Usage

* 
[](#VUID-vkCreateImage-device-09666) VUID-vkCreateImage-device-09666

    `device` **must** support at least one queue family with one of the
    [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits),
    [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits),
    [VK_QUEUE_OPTICAL_FLOW_BIT_NV](devsandqueues.html#VkQueueFlagBits),
[VK_QUEUE_SPARSE_BINDING_BIT](devsandqueues.html#VkQueueFlagBits),
    [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or
    [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capabilities

* 
[](#VUID-vkCreateImage-flags-00939) VUID-vkCreateImage-flags-00939

If the `flags` member of `pCreateInfo` includes
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits),
and the [    `extendedSparseAddressSpace`](features.html#features-extendedSparseAddressSpace) feature is not enabled,
creating this `VkImage` **must** not cause the total required sparse
memory for all currently valid sparse resources on the device to exceed
`VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`

* 
[](#VUID-vkCreateImage-flags-09385) VUID-vkCreateImage-flags-09385

If the `flags` member of `pCreateInfo` includes
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits), the
[    `extendedSparseAddressSpace`](features.html#features-extendedSparseAddressSpace) feature is enabled, and the
`usage` member of `pCreateInfo` contains bits not in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseImageUsageFlags`,
creating this `VkImage` **must** not cause the total required sparse
memory for all currently valid sparse resources on the device, excluding
`VkBuffer` created with `usage` member of `pCreateInfo`
containing bits in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseBufferUsageFlags`
and `VkImage` created with `usage` member of `pCreateInfo`
containing bits in
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseImageUsageFlags`,
to exceed `VkPhysicalDeviceLimits`::`sparseAddressSpaceSize`

* 
[](#VUID-vkCreateImage-flags-09386) VUID-vkCreateImage-flags-09386

If the `flags` member of `pCreateInfo` includes
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits) and the
[    `extendedSparseAddressSpace`](features.html#features-extendedSparseAddressSpace) feature is enabled, creating this
`VkImage` **must** not cause the total required sparse memory for all
currently valid sparse resources on the device to exceed
`VkPhysicalDeviceExtendedSparseAddressSpacePropertiesNV`::`extendedSparseAddressSpaceSize`

* 
[](#VUID-vkCreateImage-pNext-06389) VUID-vkCreateImage-pNext-06389

If a [VkBufferCollectionImageCreateInfoFUCHSIA](#VkBufferCollectionImageCreateInfoFUCHSIA) has been chained to
`pNext`, `pCreateInfo` **must** match the
[Sysmem chosen `VkImageCreateInfo`](#sysmem-chosen-create-infos)
excepting members [VkImageCreateInfo](#VkImageCreateInfo)::`extent` and
[VkImageCreateInfo](#VkImageCreateInfo)::`usage` in the match criteria

Valid Usage (Implicit)

* 
[](#VUID-vkCreateImage-device-parameter) VUID-vkCreateImage-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateImage-pCreateInfo-parameter) VUID-vkCreateImage-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkImageCreateInfo](#VkImageCreateInfo) structure

* 
[](#VUID-vkCreateImage-pAllocator-parameter) VUID-vkCreateImage-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateImage-pImage-parameter) VUID-vkCreateImage-pImage-parameter

 `pImage` **must** be a valid pointer to a [VkImage](#VkImage) handle

* 
[](#VUID-vkCreateImage-device-queuecount) VUID-vkCreateImage-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_COMPRESSION_EXHAUSTED_EXT](fundamentals.html#VkResult)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkImageCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageCreateInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkImageCreateFlags       flags;
    VkImageType              imageType;
    VkFormat                 format;
    VkExtent3D               extent;
    uint32_t                 mipLevels;
    uint32_t                 arrayLayers;
    VkSampleCountFlagBits    samples;
    VkImageTiling            tiling;
    VkImageUsageFlags        usage;
    VkSharingMode            sharingMode;
    uint32_t                 queueFamilyIndexCount;
    const uint32_t*          pQueueFamilyIndices;
    VkImageLayout            initialLayout;
} VkImageCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkImageCreateFlagBits](#VkImageCreateFlagBits) describing
additional parameters of the image.

* 
`imageType` is a [VkImageType](#VkImageType) value specifying the basic
dimensionality of the image.
Layers in array textures do not count as a dimension for the purposes of
the image type.

* 
`format` is a [VkFormat](formats.html#VkFormat) describing the format and type of the
texel blocks that will be contained in the image.

* 
`extent` is a [VkExtent3D](fundamentals.html#VkExtent3D) describing the number of
texels/pixels in each dimension of the base level.

* 
`mipLevels` describes the number of levels of detail available for
minified sampling of the image.

* 
`arrayLayers` is the number of layers in the image.

* 
`samples` is a [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value specifying the
number of [samples per texel](primsrast.html#primsrast-multisampling).

* 
`tiling` is a [VkImageTiling](#VkImageTiling) value specifying the tiling
arrangement of the texel blocks in memory.

* 
`usage` is a bitmask of [VkImageUsageFlagBits](#VkImageUsageFlagBits) describing the
intended usage of the image.

* 
`sharingMode` is a [VkSharingMode](#VkSharingMode) value specifying the sharing
mode of the image when it will be accessed by multiple queue families.

* 
`queueFamilyIndexCount` is the number of entries in the
`pQueueFamilyIndices` array.

* 
`pQueueFamilyIndices` is a pointer to an array of queue families
that will access this image.
It is ignored if `sharingMode` is not
[VK_SHARING_MODE_CONCURRENT](#VkSharingMode).

* 
`initialLayout` is a [VkImageLayout](#VkImageLayout) value specifying the
initial [VkImageLayout](#VkImageLayout) of all image subresources of the image.
See [Image Layouts](#resources-image-layouts).

Images created with `tiling` equal to [VK_IMAGE_TILING_LINEAR](#VkImageTiling) have
further restrictions on their limits and capabilities compared to images
created with `tiling` equal to [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling).
Creation of images with tiling [VK_IMAGE_TILING_LINEAR](#VkImageTiling) **may** not be
supported unless other parameters meet all of the constraints:

* 
`imageType` is [VK_IMAGE_TYPE_2D](#VkImageType)

* 
`format` is not a depth/stencil format

* 
`mipLevels` is 1

* 
`arrayLayers` is 1

* 
`samples` is [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
`usage` only includes [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](#VkImageUsageFlagBits) and/or
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](#VkImageUsageFlagBits)

Images created with one of the [formats that require a sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion), have further
restrictions on their limits and capabilities compared to images created
with other formats.
Creation of images with a format requiring
[Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion) **may** not
be supported unless other parameters meet all of the constraints:

* 
`imageType` is [VK_IMAGE_TYPE_2D](#VkImageType)

* 
`mipLevels` is 1

* 
`arrayLayers` is 1, unless
the [`ycbcrImageArrays`](features.html#features-ycbcrImageArrays) feature is
enabled, or
otherwise indicated by
[VkImageFormatProperties](capabilities.html#VkImageFormatProperties)::`maxArrayLayers`, as returned by
[vkGetPhysicalDeviceImageFormatProperties](capabilities.html#vkGetPhysicalDeviceImageFormatProperties)

* 
`samples` is [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

Images created with the [VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](#VkImageUsageFlagBits) usage flag
set have further restrictions on their limits and capabilities compared to
images created without this flag.
Creation of images with usage including
[VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](#VkImageUsageFlagBits) **may** not be supported unless
parameters meet all of the constraints:

* 
`flags` is 0 or only includes [VK_IMAGE_CREATE_ALIAS_BIT](#VkImageCreateFlagBits)

* 
`imageType` is [VK_IMAGE_TYPE_2D](#VkImageType)

* 
`mipLevels` is 1

* 
`arrayLayers` is 1

* 
`samples` is [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
`tiling` is [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling)

* 
`usage` includes [VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](#VkImageUsageFlagBits) and any
valid combination of the following [VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_STORAGE_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits)

Implementations **may** support additional limits and capabilities beyond those
listed above.

To determine the set of valid `usage` bits for a given format, call
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties).

If the size of the resultant image would exceed `maxResourceSize`, then
[vkCreateImage](#vkCreateImage) **must** fail and return
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult).
This failure **may** occur even when all image creation parameters satisfy
their valid usage requirements.

If the implementation reports [VK_TRUE](fundamentals.html#VK_TRUE) in
[VkPhysicalDeviceHostImageCopyProperties](limits.html#VkPhysicalDeviceHostImageCopyProperties)::`identicalMemoryTypeRequirements`,
usage of [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](#VkImageUsageFlagBits) **must** not affect the memory
type requirements of the image as described in
[Sparse Resource Memory Requirements](sparsemem.html#sparsememory-memory-requirements) and
[Resource Memory Association](#resources-association).

|  | For images created without the [VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](#VkImageCreateFlagBits) flag
| --- | --- |
set, a `usage` bit is valid if it is supported for the format the image
is created with.

For images created with [VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](#VkImageCreateFlagBits) a
`usage` bit is valid if it is supported for at least one of the formats
a `VkImageView` created from the image **can** have (see
[Image Views](#resources-image-views) for more detail). |

Image Creation Limits

Valid values for some image creation parameters are limited by a numerical
upper bound or by inclusion in a bitset.
For example, [VkImageCreateInfo](#VkImageCreateInfo)::`arrayLayers` is limited by
`imageCreateMaxArrayLayers`, defined below; and
[VkImageCreateInfo](#VkImageCreateInfo)::`samples` is limited by
`imageCreateSampleCounts`, also defined below.

Several limiting values are defined below, as well as assisting values from
which the limiting values are derived.
The limiting values are referenced by the relevant valid usage statements of
[VkImageCreateInfo](#VkImageCreateInfo).

* 
Let `uint64_t imageCreateDrmFormatModifiers[]` be the set of
[Linux DRM format modifiers](../appendices/glossary.html#glossary-drm-format-modifier) that the
resultant image **may** have.

If `tiling` is not [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling),
then `imageCreateDrmFormatModifiers` is empty.

* 
If [VkImageCreateInfo](#VkImageCreateInfo)::`pNext` contains
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT), then
`imageCreateDrmFormatModifiers` contains exactly one modifier,
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT)::`drmFormatModifier`.

* 
If [VkImageCreateInfo](#VkImageCreateInfo)::`pNext` contains
[VkImageDrmFormatModifierListCreateInfoEXT](#VkImageDrmFormatModifierListCreateInfoEXT), then
`imageCreateDrmFormatModifiers` contains the entire array
[VkImageDrmFormatModifierListCreateInfoEXT](#VkImageDrmFormatModifierListCreateInfoEXT)::`pDrmFormatModifiers`.

Let `VkBool32 imageCreateMaybeLinear` indicate if the resultant image
may be [linear](../appendices/glossary.html#glossary-linear-resource).

* 
If `tiling` is [VK_IMAGE_TILING_LINEAR](#VkImageTiling), then
`imageCreateMaybeLinear` is [VK_TRUE](fundamentals.html#VK_TRUE).

* 
If `tiling` is [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling), then
`imageCreateMaybeLinear` is [VK_FALSE](fundamentals.html#VK_FALSE).

* 
If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then
`imageCreateMaybeLinear` is [VK_TRUE](fundamentals.html#VK_TRUE) if and only if
`imageCreateDrmFormatModifiers` contains
`DRM_FORMAT_MOD_LINEAR`.

Let `VkFormatFeatureFlags imageCreateFormatFeatures` be the set of valid
*format features* available during image creation.

* 
If `tiling` is [VK_IMAGE_TILING_LINEAR](#VkImageTiling), then
`imageCreateFormatFeatures` is the value of
[VkFormatProperties](formats.html#VkFormatProperties)::`linearTilingFeatures` found by calling
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) with parameter `format`
equal to [VkImageCreateInfo](#VkImageCreateInfo)::`format`.

* 
If `tiling` is [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling),
and if the `pNext` chain includes no
[VkExternalFormatANDROID](#VkExternalFormatANDROID)
or
[VkExternalFormatQNX](#VkExternalFormatQNX)
structure with non-zero `externalFormat`,
then `imageCreateFormatFeatures` is the value of
[VkFormatProperties](formats.html#VkFormatProperties)::`optimalTilingFeatures` found by calling
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) with parameter `format`
equal to [VkImageCreateInfo](#VkImageCreateInfo)::`format`.

* 
If `tiling` is [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling), and if the
`pNext` chain includes a [VkExternalFormatANDROID](#VkExternalFormatANDROID) structure
with non-zero `externalFormat`, then
`imageCreateFormatFeatures` is the value of
[VkAndroidHardwareBufferFormatPropertiesANDROID](memory.html#VkAndroidHardwareBufferFormatPropertiesANDROID)::`formatFeatures`
obtained by [vkGetAndroidHardwareBufferPropertiesANDROID](memory.html#vkGetAndroidHardwareBufferPropertiesANDROID) with a
matching `externalFormat` value.

* 
If `tiling` is [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling), and if the
`pNext` chain includes a [VkExternalFormatQNX](#VkExternalFormatQNX) structure with
non-zero `externalFormat`, then `imageCreateFormatFeatures` is
the value of
[VkScreenBufferFormatPropertiesQNX](memory.html#VkScreenBufferFormatPropertiesQNX)::`formatFeatures` obtained
by [vkGetScreenBufferPropertiesQNX](memory.html#vkGetScreenBufferPropertiesQNX) with a matching
`externalFormat` value.

* 
If the `pNext` chain includes a
[VkBufferCollectionImageCreateInfoFUCHSIA](#VkBufferCollectionImageCreateInfoFUCHSIA) structure, then
`imageCreateFormatFeatures` is the value of
[VkBufferCollectionPropertiesFUCHSIA](#VkBufferCollectionPropertiesFUCHSIA)::`formatFeatures` found
by calling [vkGetBufferCollectionPropertiesFUCHSIA](#vkGetBufferCollectionPropertiesFUCHSIA) with a
parameter `collection` equal to
[VkBufferCollectionImageCreateInfoFUCHSIA](#VkBufferCollectionImageCreateInfoFUCHSIA)::`collection`

* 
If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then
the value of `imageCreateFormatFeatures` is found by calling
[vkGetPhysicalDeviceFormatProperties2](formats.html#vkGetPhysicalDeviceFormatProperties2) with
[VkImageFormatProperties](capabilities.html#VkImageFormatProperties)::`format` equal to
[VkImageCreateInfo](#VkImageCreateInfo)::`format` and with
[VkDrmFormatModifierPropertiesListEXT](formats.html#VkDrmFormatModifierPropertiesListEXT) chained into
[VkFormatProperties2](formats.html#VkFormatProperties2); by collecting all members of the returned
array
[VkDrmFormatModifierPropertiesListEXT](formats.html#VkDrmFormatModifierPropertiesListEXT)::`pDrmFormatModifierProperties`
whose `drmFormatModifier` belongs to
`imageCreateDrmFormatModifiers`; and by taking the bitwise
intersection, over the collected array members, of
`drmFormatModifierTilingFeatures`.
(The resultant `imageCreateFormatFeatures` **may** be empty).

Let `VkImageFormatProperties2 imageCreateImageFormatPropertiesList[]` be
defined as follows.

* 
If [VkImageCreateInfo](#VkImageCreateInfo)::`pNext` contains no
[VkExternalFormatANDROID](#VkExternalFormatANDROID)
or
[VkExternalFormatQNX](#VkExternalFormatQNX)
structure with non-zero `externalFormat`, then
`imageCreateImageFormatPropertiesList` is
the list of structures obtained by calling
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2), possibly multiple
times, as follows:

The parameters [VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2)::`format`,
`imageType`, `tiling`, `usage`, and `flags` **must** be
equal to those in [VkImageCreateInfo](#VkImageCreateInfo).

* 
If [VkImageCreateInfo](#VkImageCreateInfo)::`pNext` contains a
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure whose
`handleTypes` is not `0`, then
[VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2)::`pNext` **must** contain a
[VkPhysicalDeviceExternalImageFormatInfo](capabilities.html#VkPhysicalDeviceExternalImageFormatInfo) structure whose
`handleType` is not `0`; and
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) **must** be called for
each handle type in
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)::`handleTypes`, successively
setting
[VkPhysicalDeviceExternalImageFormatInfo](capabilities.html#VkPhysicalDeviceExternalImageFormatInfo)::`handleType` on
each call.

* 
If [VkImageCreateInfo](#VkImageCreateInfo)::`pNext` contains no
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure, or contains a
structure whose `handleTypes` is `0`, then
[VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2)::`pNext` **must** either
contain no [VkPhysicalDeviceExternalImageFormatInfo](capabilities.html#VkPhysicalDeviceExternalImageFormatInfo) structure, or
contain a structure whose `handleType` is `0`.

* 
If [VkImageCreateInfo](#VkImageCreateInfo)::`pNext` contains a
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure then
[VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2)::`pNext` **must** also contain
the same [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure on each call.

* 
If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling),
then:

[VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2)::`pNext` **must** contain a
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](capabilities.html#VkPhysicalDeviceImageDrmFormatModifierInfoEXT) structure where
`sharingMode` is equal to
[VkImageCreateInfo](#VkImageCreateInfo)::`sharingMode`;

* 
if `sharingMode` is [VK_SHARING_MODE_CONCURRENT](#VkSharingMode), then
`queueFamilyIndexCount` and `pQueueFamilyIndices` **must** be
equal to those in [VkImageCreateInfo](#VkImageCreateInfo);

* 
if `flags` contains [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits),
then the [VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo) structure included in the
`pNext` chain of [VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2) **must** be
equivalent to the one included in the `pNext` chain of
[VkImageCreateInfo](#VkImageCreateInfo);

* 
if [VkImageCreateInfo](#VkImageCreateInfo)::`pNext` contains a
[VkImageCompressionControlEXT](#VkImageCompressionControlEXT) structure, then the
[VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2)::`pNext` chain **must**
contain an equivalent structure;

* 
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) **must** be called for
each modifier in `imageCreateDrmFormatModifiers`, successively
setting
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](capabilities.html#VkPhysicalDeviceImageDrmFormatModifierInfoEXT)::`drmFormatModifier`
on each call.

If `tiling` is not [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling),
then [VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2)::`pNext` **must** contain
no [VkPhysicalDeviceImageDrmFormatModifierInfoEXT](capabilities.html#VkPhysicalDeviceImageDrmFormatModifierInfoEXT) structure.

If any call to [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) returns
an error, then `imageCreateImageFormatPropertiesList` is defined
to be the empty list.

If [VkImageCreateInfo](#VkImageCreateInfo)::`pNext` contains a
[VkExternalFormatANDROID](#VkExternalFormatANDROID) structure with non-zero
`externalFormat`, then `imageCreateImageFormatPropertiesList`
contains a single element where:

* 
`VkImageFormatProperties`::`maxMipLevels` is
⌊log2(max(`extent.width`, `extent.height`,
`extent.depth`))⌋ +  1.

* 
`VkImageFormatProperties`::`maxArrayLayers` is
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageArrayLayers`.

* 
Each component of `VkImageFormatProperties`::`maxExtent` is
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxImageDimension2D`.

* 
`VkImageFormatProperties`::`sampleCounts` contains exactly
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits).

Let `uint32_t imageCreateMaxMipLevels` be
the minimum value of [VkImageFormatProperties](capabilities.html#VkImageFormatProperties)::`maxMipLevels`
in `imageCreateImageFormatPropertiesList`.
The value is **undefined** if `imageCreateImageFormatPropertiesList` is
empty.

Let `uint32_t imageCreateMaxArrayLayers` be
the minimum value of [VkImageFormatProperties](capabilities.html#VkImageFormatProperties)::`maxArrayLayers`
in `imageCreateImageFormatPropertiesList`.
The value is **undefined** if `imageCreateImageFormatPropertiesList` is
empty.

Let `VkExtent3D imageCreateMaxExtent` be
the component-wise minimum over all
[VkImageFormatProperties](capabilities.html#VkImageFormatProperties)::`maxExtent` values in
`imageCreateImageFormatPropertiesList`.
The value is **undefined** if `imageCreateImageFormatPropertiesList` is
empty.

Let `VkSampleCountFlags imageCreateSampleCounts` be
the intersection of each
[VkImageFormatProperties](capabilities.html#VkImageFormatProperties)::`sampleCounts` in
`imageCreateImageFormatPropertiesList`.
The value is **undefined** if `imageCreateImageFormatPropertiesList` is
empty.

Let `VkVideoFormatPropertiesKHR videoFormatProperties[]` be defined as
follows.

* 
If [VkImageCreateInfo](#VkImageCreateInfo)::`pNext` contains a
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure, then `videoFormatProperties`
is the list of structures obtained by calling
[vkGetPhysicalDeviceVideoFormatPropertiesKHR](videocoding.html#vkGetPhysicalDeviceVideoFormatPropertiesKHR) with
[VkPhysicalDeviceVideoFormatInfoKHR](videocoding.html#VkPhysicalDeviceVideoFormatInfoKHR)::`imageUsage` equal to the
`usage` member of [VkImageCreateInfo](#VkImageCreateInfo) and
[VkPhysicalDeviceVideoFormatInfoKHR](videocoding.html#VkPhysicalDeviceVideoFormatInfoKHR)::`pNext` containing the
same [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure chained to
[VkImageCreateInfo](#VkImageCreateInfo).

* 
If [VkImageCreateInfo](#VkImageCreateInfo)::`pNext` contains no
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure, then `videoFormatProperties`
is an empty list.

Let `VkBool32 supportedVideoFormat` indicate if the image parameters are
supported by the specified video profiles.

* 
`supportedVideoFormat` is [VK_TRUE](fundamentals.html#VK_TRUE) if there exists an element in
the `videoFormatProperties` list for which all of the following
conditions are true:

[VkImageCreateInfo](#VkImageCreateInfo)::`format` equals
[VkVideoFormatPropertiesKHR](videocoding.html#VkVideoFormatPropertiesKHR)::`format`.

* 
[VkImageCreateInfo](#VkImageCreateInfo)::`flags` only contains
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkImageCreateFlagBits) and/or
bits also set in
[VkVideoFormatPropertiesKHR](videocoding.html#VkVideoFormatPropertiesKHR)::`imageCreateFlags`.

* 
[VkImageCreateInfo](#VkImageCreateInfo)::`imageType` equals
[VkVideoFormatPropertiesKHR](videocoding.html#VkVideoFormatPropertiesKHR)::`imageType`.

* 
[VkImageCreateInfo](#VkImageCreateInfo)::`tiling` equals
[VkVideoFormatPropertiesKHR](videocoding.html#VkVideoFormatPropertiesKHR)::`imageTiling`.

* 
[VkImageCreateInfo](#VkImageCreateInfo)::`usage` only contains bits also set in
[VkVideoFormatPropertiesKHR](videocoding.html#VkVideoFormatPropertiesKHR)::`imageUsageFlags`, or
[VkImageCreateInfo](#VkImageCreateInfo)::`flags` includes
[VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](#VkImageCreateFlagBits).

Otherwise `supportedVideoFormat` is [VK_FALSE](fundamentals.html#VK_FALSE).

Valid Usage

* 
[](#VUID-VkImageCreateInfo-imageCreateMaxMipLevels-02251) VUID-VkImageCreateInfo-imageCreateMaxMipLevels-02251

Each of the following values (as described in
[Image Creation Limits](#resources-image-creation-limits)) **must** not be
**undefined** : `imageCreateMaxMipLevels`,
`imageCreateMaxArrayLayers`, `imageCreateMaxExtent`, and
`imageCreateSampleCounts`

* 
[](#VUID-VkImageCreateInfo-sharingMode-00941) VUID-VkImageCreateInfo-sharingMode-00941

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](#VkSharingMode),
`pQueueFamilyIndices` **must** be a valid pointer to an array of
`queueFamilyIndexCount` `uint32_t` values

* 
[](#VUID-VkImageCreateInfo-sharingMode-00942) VUID-VkImageCreateInfo-sharingMode-00942

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](#VkSharingMode),
`queueFamilyIndexCount` **must** be greater than `1`

* 
[](#VUID-VkImageCreateInfo-sharingMode-01420) VUID-VkImageCreateInfo-sharingMode-01420

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](#VkSharingMode), each element
of `pQueueFamilyIndices` **must** be unique and **must** be less than
`pQueueFamilyPropertyCount` returned by either
[vkGetPhysicalDeviceQueueFamilyProperties](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties) or
[vkGetPhysicalDeviceQueueFamilyProperties2](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties2) for the
`physicalDevice` that was used to create `device`

* 
[](#VUID-VkImageCreateInfo-pNext-01974) VUID-VkImageCreateInfo-pNext-01974

If the `pNext` chain includes a [VkExternalFormatANDROID](#VkExternalFormatANDROID)
structure, and its `externalFormat` member is non-zero the
`format` **must** be [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-VkImageCreateInfo-pNext-01975) VUID-VkImageCreateInfo-pNext-01975

If the `pNext` chain does not include a
[VkExternalFormatANDROID](#VkExternalFormatANDROID) structure, or does and its
`externalFormat` member is `0`, the `format` **must** not be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-VkImageCreateInfo-extent-00944) VUID-VkImageCreateInfo-extent-00944

`extent.width` **must** be greater than `0`

* 
[](#VUID-VkImageCreateInfo-extent-00945) VUID-VkImageCreateInfo-extent-00945

`extent.height` **must** be greater than `0`

* 
[](#VUID-VkImageCreateInfo-extent-00946) VUID-VkImageCreateInfo-extent-00946

`extent.depth` **must** be greater than `0`

* 
[](#VUID-VkImageCreateInfo-mipLevels-00947) VUID-VkImageCreateInfo-mipLevels-00947

`mipLevels` **must** be greater than `0`

* 
[](#VUID-VkImageCreateInfo-arrayLayers-00948) VUID-VkImageCreateInfo-arrayLayers-00948

`arrayLayers` **must** be greater than `0`

* 
[](#VUID-VkImageCreateInfo-flags-00949) VUID-VkImageCreateInfo-flags-00949

If `flags` contains [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](#VkImageCreateFlagBits),
`imageType` **must** be [VK_IMAGE_TYPE_2D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-flags-08865) VUID-VkImageCreateInfo-flags-08865

If `flags` contains [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](#VkImageCreateFlagBits),
`extent.width` and `extent.height` **must** be equal

* 
[](#VUID-VkImageCreateInfo-flags-08866) VUID-VkImageCreateInfo-flags-08866

If `flags` contains [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](#VkImageCreateFlagBits),
`arrayLayers` **must** be greater than or equal to 6

* 
[](#VUID-VkImageCreateInfo-initialLayout-10765) VUID-VkImageCreateInfo-initialLayout-10765

If the [    zeroInitializeDeviceMemory](features.html#features-zeroInitializeDeviceMemory) feature is not enabled, `initialLayout`
**must** not be [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#VkImageLayout)

* 
[](#VUID-VkImageCreateInfo-flags-02557) VUID-VkImageCreateInfo-flags-02557

If `flags` contains
[VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkImageUsageFlagBits), `imageType` **must**
be [VK_IMAGE_TYPE_2D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-flags-00950) VUID-VkImageCreateInfo-flags-00950

If `flags` contains [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits),
`imageType` **must** be [VK_IMAGE_TYPE_3D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-flags-09403) VUID-VkImageCreateInfo-flags-09403

If `flags` contains [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits),
`flags` **must** not include [VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](#VkImageCreateFlagBits),
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits), or
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-flags-07755) VUID-VkImageCreateInfo-flags-07755

If `flags` contains
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](#VkImageCreateFlagBits), `imageType` **must**
be [VK_IMAGE_TYPE_3D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-imageType-10197) VUID-VkImageCreateInfo-imageType-10197

    If `flags` contains [VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](#VkImageCreateFlagBits)
and either the [`maintenance9`](features.html#features-maintenance9) feature is not
enabled on the device or
[`image2DViewOf3DSparse`](limits.html#limits-image2DViewOf3DSparse) is
[VK_FALSE](fundamentals.html#VK_FALSE)
    , `flags` **must** not include
    [VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](#VkImageCreateFlagBits),
    [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits), or
    [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-extent-02252) VUID-VkImageCreateInfo-extent-02252

`extent.width` **must** be less than or equal to
`imageCreateMaxExtent.width` (as defined in
[Image Creation Limits](#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-extent-02253) VUID-VkImageCreateInfo-extent-02253

`extent.height` **must** be less than or equal to
`imageCreateMaxExtent.height` (as defined in
[Image Creation Limits](#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-extent-02254) VUID-VkImageCreateInfo-extent-02254

`extent.depth` **must** be less than or equal to
`imageCreateMaxExtent.depth` (as defined in
[Image Creation Limits](#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-imageType-00956) VUID-VkImageCreateInfo-imageType-00956

If `imageType` is [VK_IMAGE_TYPE_1D](#VkImageType), both `extent.height`
and `extent.depth` **must** be `1`

* 
[](#VUID-VkImageCreateInfo-imageType-00957) VUID-VkImageCreateInfo-imageType-00957

If `imageType` is [VK_IMAGE_TYPE_2D](#VkImageType), `extent.depth` **must**
be `1`

* 
[](#VUID-VkImageCreateInfo-mipLevels-00958) VUID-VkImageCreateInfo-mipLevels-00958

`mipLevels` **must** be less than or equal to the number of levels in
the complete mipmap chain based on `extent.width`,
`extent.height`, and `extent.depth`

* 
[](#VUID-VkImageCreateInfo-mipLevels-02255) VUID-VkImageCreateInfo-mipLevels-02255

`mipLevels` **must** be less than or equal to
`imageCreateMaxMipLevels` (as defined in
[Image Creation Limits](#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-arrayLayers-02256) VUID-VkImageCreateInfo-arrayLayers-02256

`arrayLayers` **must** be less than or equal to
`imageCreateMaxArrayLayers` (as defined in
[Image Creation Limits](#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-imageType-00961) VUID-VkImageCreateInfo-imageType-00961

If `imageType` is [VK_IMAGE_TYPE_3D](#VkImageType), `arrayLayers` **must** be
`1`

* 
[](#VUID-VkImageCreateInfo-samples-02257) VUID-VkImageCreateInfo-samples-02257

If `samples` is not [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits), then
`imageType` **must** be [VK_IMAGE_TYPE_2D](#VkImageType), `flags` **must** not
contain [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](#VkImageCreateFlagBits), `mipLevels` **must**
be equal to `1`, and `imageCreateMaybeLinear` (as defined in
[Image Creation Limits](#resources-image-creation-limits)) **must** be
[VK_FALSE](fundamentals.html#VK_FALSE),

* 
[](#VUID-VkImageCreateInfo-samples-02558) VUID-VkImageCreateInfo-samples-02558

If `samples` is not [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits), `usage` **must**
not contain [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-usage-00963) VUID-VkImageCreateInfo-usage-00963

If `usage` includes [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits),
then bits other than [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits), and
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits) **must** not be set

* 
[](#VUID-VkImageCreateInfo-usage-00964) VUID-VkImageCreateInfo-usage-00964

If `usage` includes [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits), `extent.width` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxFramebufferWidth`

* 
[](#VUID-VkImageCreateInfo-usage-00965) VUID-VkImageCreateInfo-usage-00965

If `usage` includes [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits), `extent.height` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxFramebufferHeight`

* 
[](#VUID-VkImageCreateInfo-fragmentDensityMapOffset-06514) VUID-VkImageCreateInfo-fragmentDensityMapOffset-06514

If the [    `fragmentDensityMapOffset`](features.html#features-fragmentDensityMapOffset) feature is not enabled and `usage`
includes [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkImageUsageFlagBits),
`extent.width` **must** be less than or equal to
  

* 
[](#VUID-VkImageCreateInfo-fragmentDensityMapOffset-06515) VUID-VkImageCreateInfo-fragmentDensityMapOffset-06515

If the [    `fragmentDensityMapOffset`](features.html#features-fragmentDensityMapOffset) feature is not enabled and `usage`
includes [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkImageUsageFlagBits),
`extent.height` **must** be less than or equal to
  

* 
[](#VUID-VkImageCreateInfo-usage-00966) VUID-VkImageCreateInfo-usage-00966

If `usage` includes [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits),
`usage` **must** also contain at least one of
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-samples-02258) VUID-VkImageCreateInfo-samples-02258

`samples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value that is
set in `imageCreateSampleCounts` (as defined in
[Image Creation Limits](#resources-image-creation-limits))

* 
[](#VUID-VkImageCreateInfo-usage-00968) VUID-VkImageCreateInfo-usage-00968

If the [    `shaderStorageImageMultisample`](features.html#features-shaderStorageImageMultisample) feature is not enabled, and
`usage` contains [VK_IMAGE_USAGE_STORAGE_BIT](#VkImageUsageFlagBits), `samples`
**must** be [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkImageCreateInfo-flags-00969) VUID-VkImageCreateInfo-flags-00969

If the [`sparseBinding`](features.html#features-sparseBinding) feature is not
enabled, `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-flags-01924) VUID-VkImageCreateInfo-flags-01924

If the [`sparseResidencyAliased`](features.html#features-sparseResidencyAliased)
feature is not enabled, `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-tiling-04121) VUID-VkImageCreateInfo-tiling-04121

If `tiling` is [VK_IMAGE_TILING_LINEAR](#VkImageTiling), `flags` **must** not
contain [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-imageType-00970) VUID-VkImageCreateInfo-imageType-00970

If `imageType` is [VK_IMAGE_TYPE_1D](#VkImageType), `flags` **must** not
contain [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-imageType-00971) VUID-VkImageCreateInfo-imageType-00971

If the [`sparseResidencyImage2D`](features.html#features-sparseResidencyImage2D)
feature is not enabled, and `imageType` is [VK_IMAGE_TYPE_2D](#VkImageType),
`flags` **must** not contain [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-imageType-00972) VUID-VkImageCreateInfo-imageType-00972

If the [`sparseResidencyImage3D`](features.html#features-sparseResidencyImage3D)
feature is not enabled, and `imageType` is [VK_IMAGE_TYPE_3D](#VkImageType),
`flags` **must** not contain [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-imageType-00973) VUID-VkImageCreateInfo-imageType-00973

If the [    `sparseResidency2Samples`](features.html#features-sparseResidency2Samples) feature is not enabled, `imageType`
is [VK_IMAGE_TYPE_2D](#VkImageType), and `samples` is
[VK_SAMPLE_COUNT_2_BIT](limits.html#VkSampleCountFlagBits), `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-imageType-00974) VUID-VkImageCreateInfo-imageType-00974

If the [    `sparseResidency4Samples`](features.html#features-sparseResidency4Samples) feature is not enabled, `imageType`
is [VK_IMAGE_TYPE_2D](#VkImageType), and `samples` is
[VK_SAMPLE_COUNT_4_BIT](limits.html#VkSampleCountFlagBits), `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-imageType-00975) VUID-VkImageCreateInfo-imageType-00975

If the [    `sparseResidency8Samples`](features.html#features-sparseResidency8Samples) feature is not enabled, `imageType`
is [VK_IMAGE_TYPE_2D](#VkImageType), and `samples` is
[VK_SAMPLE_COUNT_8_BIT](limits.html#VkSampleCountFlagBits), `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-imageType-00976) VUID-VkImageCreateInfo-imageType-00976

If the [    `sparseResidency16Samples`](features.html#features-sparseResidency16Samples) feature is not enabled, `imageType`
is [VK_IMAGE_TYPE_2D](#VkImageType), and `samples` is
[VK_SAMPLE_COUNT_16_BIT](limits.html#VkSampleCountFlagBits), `flags` **must** not contain
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-flags-00987) VUID-VkImageCreateInfo-flags-00987

If `flags` contains [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits) or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](#VkImageCreateFlagBits), it **must** also contain
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-None-01925) VUID-VkImageCreateInfo-None-01925

If any of the bits [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](#VkImageCreateFlagBits) are set,
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits) **must** not also be set

* 
[](#VUID-VkImageCreateInfo-flags-01890) VUID-VkImageCreateInfo-flags-01890

If the [`protectedMemory`](features.html#features-protectedMemory) feature is
not enabled, `flags` **must** not contain
[VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-None-01891) VUID-VkImageCreateInfo-None-01891

If any of the bits [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](#VkImageCreateFlagBits) are set,
[VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits) **must** not also be set

* 
[](#VUID-VkImageCreateInfo-pNext-00988) VUID-VkImageCreateInfo-pNext-00988

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfoNV](#VkExternalMemoryImageCreateInfoNV) structure, it **must** not contain
a [VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure

* 
[](#VUID-VkImageCreateInfo-pNext-00990) VUID-VkImageCreateInfo-pNext-00990

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure, its `handleTypes`
member **must** only contain bits that are also in
[VkExternalImageFormatProperties](capabilities.html#VkExternalImageFormatProperties)::`externalMemoryProperties.compatibleHandleTypes`,
as returned by [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) with
`format`, `imageType`, `tiling`, `usage`, and
`flags` equal to those in this structure, and with a
[VkPhysicalDeviceExternalImageFormatInfo](capabilities.html#VkPhysicalDeviceExternalImageFormatInfo) structure included in the
`pNext` chain, with a `handleType` equal to any one of the
handle types specified in
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)::`handleTypes`

* 
[](#VUID-VkImageCreateInfo-pNext-00991) VUID-VkImageCreateInfo-pNext-00991

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfoNV](#VkExternalMemoryImageCreateInfoNV) structure, its `handleTypes`
member **must** only contain bits that are also in
[VkExternalImageFormatPropertiesNV](capabilities.html#VkExternalImageFormatPropertiesNV)::`externalMemoryFeatures.compatibleHandleTypes`,
as returned by [vkGetPhysicalDeviceExternalImageFormatPropertiesNV](capabilities.html#vkGetPhysicalDeviceExternalImageFormatPropertiesNV)
with `format`, `imageType`, `tiling`, `usage`, and
`flags` equal to those in this structure, and with
`externalHandleType` equal to any one of the handle types specified
in [VkExternalMemoryImageCreateInfoNV](#VkExternalMemoryImageCreateInfoNV)::`handleTypes`

* 
[](#VUID-VkImageCreateInfo-physicalDeviceCount-01421) VUID-VkImageCreateInfo-physicalDeviceCount-01421

If the logical device was created with
[VkDeviceGroupDeviceCreateInfo](devsandqueues.html#VkDeviceGroupDeviceCreateInfo)::`physicalDeviceCount` equal to
1, `flags` **must** not contain
[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-flags-02259) VUID-VkImageCreateInfo-flags-02259

If `flags` contains
[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](#VkImageCreateFlagBits), then
`mipLevels` **must** be one, `arrayLayers` **must** be one,
`imageType` **must** be [VK_IMAGE_TYPE_2D](#VkImageType), and
`imageCreateMaybeLinear` (as defined in
[Image Creation Limits](#resources-image-creation-limits)) **must** be
[VK_FALSE](fundamentals.html#VK_FALSE)

* 
[](#VUID-VkImageCreateInfo-flags-01572) VUID-VkImageCreateInfo-flags-01572

If `flags` contains
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#VkImageCreateFlagBits), then `format`
**must** be a [compressed image format](../appendices/compressedtex.html#compressed_image_formats)

* 
[](#VUID-VkImageCreateInfo-flags-01573) VUID-VkImageCreateInfo-flags-01573

If `flags` contains
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#VkImageCreateFlagBits), then `flags`
**must** also contain [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-initialLayout-00993) VUID-VkImageCreateInfo-initialLayout-00993

    `initialLayout` **must** be [VK_IMAGE_LAYOUT_UNDEFINED](#VkImageLayout) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#VkImageLayout) or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](#VkImageLayout)

* 
[](#VUID-VkImageCreateInfo-pNext-01443) VUID-VkImageCreateInfo-pNext-01443

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) or
`VkExternalMemoryImageCreateInfoNV` structure whose
`handleTypes` member is not `0`, `initialLayout` **must** be
[VK_IMAGE_LAYOUT_UNDEFINED](#VkImageLayout)

* 
[](#VUID-VkImageCreateInfo-format-06410) VUID-VkImageCreateInfo-format-06410

If the image `format` is one of the
[formats that require a    sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion), `mipLevels` **must** be 1

* 
[](#VUID-VkImageCreateInfo-format-06411) VUID-VkImageCreateInfo-format-06411

If the image `format` is one of the
[formats that require a    sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion), `samples` **must** be
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkImageCreateInfo-format-06412) VUID-VkImageCreateInfo-format-06412

If the image `format` is one of the
[formats that require a    sampler Y′CBCR conversion](formats.html#formats-requiring-sampler-ycbcr-conversion), `imageType` **must** be
[VK_IMAGE_TYPE_2D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-imageCreateFormatFeatures-02260) VUID-VkImageCreateInfo-imageCreateFormatFeatures-02260

If `format` is a *multi-planar* format, and if
`imageCreateFormatFeatures` (as defined in
[Image Creation Limits](#resources-image-creation-limits)) does not
contain [VK_FORMAT_FEATURE_DISJOINT_BIT](formats.html#VkFormatFeatureFlagBits), then `flags` **must** not
contain [VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-format-01577) VUID-VkImageCreateInfo-format-01577

If `format` is not a *multi-planar* format, and `flags` does not
include [VK_IMAGE_CREATE_ALIAS_BIT](#VkImageCreateFlagBits), `flags` **must** not contain
[VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-format-04712) VUID-VkImageCreateInfo-format-04712

If `format` has a `_422` or `_420` suffix, `extent.width`
**must** be a multiple of 2

* 
[](#VUID-VkImageCreateInfo-format-04713) VUID-VkImageCreateInfo-format-04713

If `format` has a `_420` suffix, `extent.height` **must** be a
multiple of 2

* 
[](#VUID-VkImageCreateInfo-format-09583) VUID-VkImageCreateInfo-format-09583

If `format` is one of the `VK_FORMAT_PVRTC1_*_IMG` formats,
`extent.width` **must** be a power of 2

* 
[](#VUID-VkImageCreateInfo-format-09584) VUID-VkImageCreateInfo-format-09584

If `format` is one of the `VK_FORMAT_PVRTC1_*_IMG` formats,
`extent.height` **must** be a power of 2

* 
[](#VUID-VkImageCreateInfo-tiling-02261) VUID-VkImageCreateInfo-tiling-02261

If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then
the `pNext` chain **must** include exactly one of
[VkImageDrmFormatModifierListCreateInfoEXT](#VkImageDrmFormatModifierListCreateInfoEXT) or
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT) structures

* 
[](#VUID-VkImageCreateInfo-pNext-02262) VUID-VkImageCreateInfo-pNext-02262

If the `pNext` chain includes a
[VkImageDrmFormatModifierListCreateInfoEXT](#VkImageDrmFormatModifierListCreateInfoEXT) or
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT) structure, then
`tiling` **must** be [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling)

* 
[](#VUID-VkImageCreateInfo-tiling-02353) VUID-VkImageCreateInfo-tiling-02353

If `tiling` is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling) and
`flags` contains [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits), then the
`pNext` chain **must** include a [VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo)
structure with non-zero `viewFormatCount`

* 
[](#VUID-VkImageCreateInfo-flags-01533) VUID-VkImageCreateInfo-flags-01533

If `flags` contains
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](#VkImageCreateFlagBits)
`format` **must** be a depth or depth/stencil format

* 
[](#VUID-VkImageCreateInfo-pNext-02393) VUID-VkImageCreateInfo-pNext-02393

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure whose `handleTypes`
member includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`imageType` **must** be [VK_IMAGE_TYPE_2D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-pNext-02394) VUID-VkImageCreateInfo-pNext-02394

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure whose `handleTypes`
member includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`mipLevels` **must** either be `1` or equal to the number of levels in
the complete mipmap chain based on `extent.width`,
`extent.height`, and `extent.depth`

* 
[](#VUID-VkImageCreateInfo-pNext-02396) VUID-VkImageCreateInfo-pNext-02396

If the `pNext` chain includes a [VkExternalFormatANDROID](#VkExternalFormatANDROID)
structure whose `externalFormat` member is not `0`, `flags`
**must** not include [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-02397) VUID-VkImageCreateInfo-pNext-02397

If the `pNext` chain includes a [VkExternalFormatANDROID](#VkExternalFormatANDROID)
structure whose `externalFormat` member is not `0`, `usage`
**must** not include any usages except
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-09457) VUID-VkImageCreateInfo-pNext-09457

If the `pNext` chain includes a [VkExternalFormatANDROID](#VkExternalFormatANDROID)
structure whose `externalFormat` member is not `0`, and
[`externalFormatResolve`](features.html#features-externalFormatResolve) feature
is not enabled, `usage` **must** not include
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-02398) VUID-VkImageCreateInfo-pNext-02398

If the `pNext` chain includes a [VkExternalFormatANDROID](#VkExternalFormatANDROID)
structure whose `externalFormat` member is not `0`, `tiling`
**must** be [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling)

* 
[](#VUID-VkImageCreateInfo-pNext-08951) VUID-VkImageCreateInfo-pNext-08951

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure whose `handleTypes`
member includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`imageType` **must** be [VK_IMAGE_TYPE_2D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-pNext-08952) VUID-VkImageCreateInfo-pNext-08952

If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure whose `handleTypes`
member includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`mipLevels` **must** either be `1` or equal to the number of levels in
the complete mipmap chain based on `extent.width`,
`extent.height`, and `extent.depth`

* 
[](#VUID-VkImageCreateInfo-pNext-08953) VUID-VkImageCreateInfo-pNext-08953

If the `pNext` chain includes a [VkExternalFormatQNX](#VkExternalFormatQNX) structure
whose `externalFormat` member is not `0`, `flags` **must** not
include [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-08954) VUID-VkImageCreateInfo-pNext-08954

If the `pNext` chain includes a [VkExternalFormatQNX](#VkExternalFormatQNX) structure
whose `externalFormat` member is not `0`, `usage` **must** not
include any usages except [VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-08955) VUID-VkImageCreateInfo-pNext-08955

If the `pNext` chain includes a [VkExternalFormatQNX](#VkExternalFormatQNX) structure
whose `externalFormat` member is not `0`, `tiling` **must** be
[VK_IMAGE_TILING_OPTIMAL](#VkImageTiling)

* 
[](#VUID-VkImageCreateInfo-format-02795) VUID-VkImageCreateInfo-format-02795

If `format` is a depth-stencil format, `usage` includes
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits), and the `pNext`
chain includes a [VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure, then its
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo)::`stencilUsage` member **must**
also include [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-format-02796) VUID-VkImageCreateInfo-format-02796

If `format` is a depth-stencil format, `usage` does not include
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits), and the `pNext`
chain includes a [VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure, then its
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo)::`stencilUsage` member **must**
also not include [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-format-02797) VUID-VkImageCreateInfo-format-02797

If `format` is a depth-stencil format, `usage` includes
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits), and the `pNext` chain
includes a [VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure, then its
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo)::`stencilUsage` member **must**
also include [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-format-02798) VUID-VkImageCreateInfo-format-02798

If `format` is a depth-stencil format, `usage` does not include
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits), and the `pNext` chain
includes a [VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure, then its
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo)::`stencilUsage` member **must**
also not include [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-Format-02536) VUID-VkImageCreateInfo-Format-02536

If `Format` is a depth-stencil format and the `pNext` chain
includes a [VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure with its
`stencilUsage` member including
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits), `extent.width` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxFramebufferWidth`

* 
[](#VUID-VkImageCreateInfo-format-02537) VUID-VkImageCreateInfo-format-02537

If `format` is a depth-stencil format and the `pNext` chain
includes a [VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure with its
`stencilUsage` member including
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits), `extent.height` **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxFramebufferHeight`

* 
[](#VUID-VkImageCreateInfo-format-02538) VUID-VkImageCreateInfo-format-02538

If the [    `shaderStorageImageMultisample`](features.html#features-shaderStorageImageMultisample) feature is not enabled,
`format` is a depth-stencil format and the `pNext` chain
includes a [VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure with its
`stencilUsage` including [VK_IMAGE_USAGE_STORAGE_BIT](#VkImageUsageFlagBits),
`samples` **must** be [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkImageCreateInfo-flags-02050) VUID-VkImageCreateInfo-flags-02050

If `flags` contains [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](#VkImageCreateFlagBits),
`imageType` **must** be [VK_IMAGE_TYPE_2D](#VkImageType) or
[VK_IMAGE_TYPE_3D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-flags-02051) VUID-VkImageCreateInfo-flags-02051

If `flags` contains [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](#VkImageCreateFlagBits), it
**must** not contain [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](#VkImageCreateFlagBits) and the
`format` **must** not be a depth/stencil format

* 
[](#VUID-VkImageCreateInfo-flags-02052) VUID-VkImageCreateInfo-flags-02052

If `flags` contains [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](#VkImageCreateFlagBits) and
`imageType` is [VK_IMAGE_TYPE_2D](#VkImageType), `extent.width` and
`extent.height` **must** be greater than `1`

* 
[](#VUID-VkImageCreateInfo-flags-02053) VUID-VkImageCreateInfo-flags-02053

If `flags` contains [VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](#VkImageCreateFlagBits) and
`imageType` is [VK_IMAGE_TYPE_3D](#VkImageType), `extent.width`,
`extent.height`, and `extent.depth` **must** be greater than `1`

* 
[](#VUID-VkImageCreateInfo-imageType-02082) VUID-VkImageCreateInfo-imageType-02082

If `usage` includes
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkImageUsageFlagBits),
`imageType` **must** be [VK_IMAGE_TYPE_2D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-samples-02083) VUID-VkImageCreateInfo-samples-02083

If `usage` includes
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkImageUsageFlagBits),
`samples` **must** be [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkImageCreateInfo-shadingRateImage-07727) VUID-VkImageCreateInfo-shadingRateImage-07727

If the [`shadingRateImage`](features.html#features-shadingRateImage) feature is
enabled and `usage` includes
[VK_IMAGE_USAGE_SHADING_RATE_IMAGE_BIT_NV](#VkImageUsageFlagBits), `tiling` **must** be
[VK_IMAGE_TILING_OPTIMAL](#VkImageTiling)

* 
[](#VUID-VkImageCreateInfo-flags-02565) VUID-VkImageCreateInfo-flags-02565

If `flags` contains [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](#VkImageCreateFlagBits),
`tiling` **must** be [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling)

* 
[](#VUID-VkImageCreateInfo-flags-02566) VUID-VkImageCreateInfo-flags-02566

If `flags` contains [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](#VkImageCreateFlagBits),
`imageType` **must** be [VK_IMAGE_TYPE_2D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-flags-02567) VUID-VkImageCreateInfo-flags-02567

If `flags` contains [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](#VkImageCreateFlagBits),
`flags` **must** not contain [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-flags-02568) VUID-VkImageCreateInfo-flags-02568

If `flags` contains [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](#VkImageCreateFlagBits),
`mipLevels` **must** be `1`

* 
[](#VUID-VkImageCreateInfo-usage-04992) VUID-VkImageCreateInfo-usage-04992

If `usage` includes [VK_IMAGE_USAGE_INVOCATION_MASK_BIT_HUAWEI](#VkImageUsageFlagBits),
`tiling` **must** be [VK_IMAGE_TILING_LINEAR](#VkImageTiling)

* 
[](#VUID-VkImageCreateInfo-imageView2DOn3DImage-04459) VUID-VkImageCreateInfo-imageView2DOn3DImage-04459

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`imageView2DOn3DImage`
is [VK_FALSE](fundamentals.html#VK_FALSE), `flags` **must** not contain
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-multisampleArrayImage-04460) VUID-VkImageCreateInfo-multisampleArrayImage-04460

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`multisampleArrayImage`
is [VK_FALSE](fundamentals.html#VK_FALSE), and `samples` is not [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits),
then `arrayLayers` **must** be `1`

* 
[](#VUID-VkImageCreateInfo-pNext-06722) VUID-VkImageCreateInfo-pNext-06722

If a [VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo) structure was included in the
`pNext` chain and `format` is not a [    multi-planar format](formats.html#formats-multiplanar) and
[VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo)::`viewFormatCount` is not zero,
then each format in
[VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo)::`pViewFormats` **must** either be
compatible with the `format` as described in the
[compatibility table](formats.html#formats-compatibility) or, if `flags`
contains [VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#VkImageCreateFlagBits), be an
uncompressed format that is [    size-compatible](formats.html#formats-size-compatibility) with `format`

* 
[](#VUID-VkImageCreateInfo-pNext-10062) VUID-VkImageCreateInfo-pNext-10062

If a [VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo) structure was included in the
`pNext` chain and `format` is a [    multi-planar format](formats.html#formats-multiplanar) and `flags` contains
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits) and
[VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo)::`viewFormatCount` is not zero,
then each format in
[VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo)::`pViewFormats` **must** be
compatible with the [VkFormat](formats.html#VkFormat) for the plane of the image format

* 
[](#VUID-VkImageCreateInfo-flags-04738) VUID-VkImageCreateInfo-flags-04738

If `flags` does not contain [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits)
and the `pNext` chain includes a [VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo)
structure, then [VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo)::`viewFormatCount`
**must** be `0` or `1`

* 
[](#VUID-VkImageCreateInfo-usage-04815) VUID-VkImageCreateInfo-usage-04815

If `usage` includes [VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](#VkImageUsageFlagBits),
and `flags` does not include
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkImageCreateFlagBits),
then the `pNext` chain **must** include a
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure with `profileCount`
greater than `0` and `pProfiles` including at least one
[VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) structure with a `videoCodecOperation`
member specifying a decode operation

* 
[](#VUID-VkImageCreateInfo-usage-04816) VUID-VkImageCreateInfo-usage-04816

If `usage` includes [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](#VkImageUsageFlagBits),
and `flags` does not include
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkImageCreateFlagBits),
then the `pNext` chain **must** include a
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure with `profileCount`
greater than `0` and `pProfiles` including at least one
[VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) structure with a `videoCodecOperation`
member specifying an encode operation

* 
[](#VUID-VkImageCreateInfo-flags-08328) VUID-VkImageCreateInfo-flags-08328

If `flags` includes
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkImageCreateFlagBits), then
[`videoMaintenance1`](features.html#features-videoMaintenance1) **must** be enabled

* 
[](#VUID-VkImageCreateInfo-flags-08329) VUID-VkImageCreateInfo-flags-08329

If `flags` includes
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkImageCreateFlagBits) and `usage`
does not include [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](#VkImageUsageFlagBits), then
`usage` **must** not include
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-flags-08331) VUID-VkImageCreateInfo-flags-08331

If `flags` includes
[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkImageCreateFlagBits), then
`usage` **must** not include
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits),
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-06811) VUID-VkImageCreateInfo-pNext-06811

If the `pNext` chain includes a [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR)
structure with `profileCount` greater than `0`, then
`supportedVideoFormat` **must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkImageCreateInfo-pNext-10784) VUID-VkImageCreateInfo-pNext-10784

If the `pNext` chain includes a [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR)
structure and for any element of its `pProfiles` member
`videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](videocoding.html#VkVideoCodecOperationFlagBitsKHR), then the
[`videoDecodeVP9`](features.html#features-videoDecodeVP9) feature **must** be
enabled

* 
[](#VUID-VkImageCreateInfo-pNext-10250) VUID-VkImageCreateInfo-pNext-10250

If the `pNext` chain includes a [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR)
structure and for any element of its `pProfiles` member
`videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](videocoding.html#VkVideoCodecOperationFlagBitsKHR), then the
[`videoEncodeAV1`](features.html#features-videoEncodeAV1) feature **must** be
enabled

* 
[](#VUID-VkImageCreateInfo-pNext-10920) VUID-VkImageCreateInfo-pNext-10920

If the `pNext` chain includes a
[VkVideoEncodeProfileRgbConversionInfoVALVE](videocoding.html#VkVideoEncodeProfileRgbConversionInfoVALVE) structure, then the
[`videoEncodeRgbConversion`](features.html#features-videoEncodeRgbConversion)
feature **must** be enabled

* 
[](#VUID-VkImageCreateInfo-usage-10251) VUID-VkImageCreateInfo-usage-10251

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits), then the
[    `videoEncodeQuantizationMap`](features.html#features-videoEncodeQuantizationMap) feature **must** be enabled

* 
[](#VUID-VkImageCreateInfo-usage-10252) VUID-VkImageCreateInfo-usage-10252

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits), `imageType`
**must** be [VK_IMAGE_TYPE_2D](#VkImageType)

* 
[](#VUID-VkImageCreateInfo-usage-10253) VUID-VkImageCreateInfo-usage-10253

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits), `samples`
**must** be [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkImageCreateInfo-usage-10254) VUID-VkImageCreateInfo-usage-10254

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits), then the
`pNext` chain **must** include a [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR)
structure with `profileCount` equal to `1` and `pProfiles`
pointing to a [VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) structure with a
`videoCodecOperation` member specifying an encode operation

* 
[](#VUID-VkImageCreateInfo-usage-10255) VUID-VkImageCreateInfo-usage-10255

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits), then
[VkVideoEncodeCapabilitiesKHR](videocoding.html#VkVideoEncodeCapabilitiesKHR)::`flags` **must** include
[VK_VIDEO_ENCODE_CAPABILITY_QUANTIZATION_DELTA_MAP_BIT_KHR](videocoding.html#VkVideoEncodeCapabilityFlagBitsKHR), as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](videocoding.html#vkGetPhysicalDeviceVideoCapabilitiesKHR) for the video
profile specified in the `pProfiles` member of the
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure included in the `pNext`
chain

* 
[](#VUID-VkImageCreateInfo-usage-10256) VUID-VkImageCreateInfo-usage-10256

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits), then
[VkVideoEncodeCapabilitiesKHR](videocoding.html#VkVideoEncodeCapabilitiesKHR)::`flags` **must** include
[VK_VIDEO_ENCODE_CAPABILITY_EMPHASIS_MAP_BIT_KHR](videocoding.html#VkVideoEncodeCapabilityFlagBitsKHR), as returned by
[vkGetPhysicalDeviceVideoCapabilitiesKHR](videocoding.html#vkGetPhysicalDeviceVideoCapabilitiesKHR) for the video profile
specified in the `pProfiles` member of the
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure included in the `pNext`
chain

* 
[](#VUID-VkImageCreateInfo-usage-10257) VUID-VkImageCreateInfo-usage-10257

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits),
`extent.width` **must** be less than or equal to
[VkVideoEncodeQuantizationMapCapabilitiesKHR](videocoding.html#VkVideoEncodeQuantizationMapCapabilitiesKHR)::`maxQuantizationMapExtent.width`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](videocoding.html#vkGetPhysicalDeviceVideoCapabilitiesKHR) for the
video profile specified in the `pProfiles` member of the
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure included in the `pNext`
chain

* 
[](#VUID-VkImageCreateInfo-usage-10258) VUID-VkImageCreateInfo-usage-10258

If `usage` includes
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits),
`extent.height` **must** be less than or equal to
[VkVideoEncodeQuantizationMapCapabilitiesKHR](videocoding.html#VkVideoEncodeQuantizationMapCapabilitiesKHR)::`maxQuantizationMapExtent.height`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](videocoding.html#vkGetPhysicalDeviceVideoCapabilitiesKHR) for the
video profile specified in the `pProfiles` member of the
[VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR) structure included in the `pNext`
chain

* 
[](#VUID-VkImageCreateInfo-pNext-06390) VUID-VkImageCreateInfo-pNext-06390

If the [VkImage](#VkImage) is to be used to import memory from a
[VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA), a
[VkBufferCollectionImageCreateInfoFUCHSIA](#VkBufferCollectionImageCreateInfoFUCHSIA) structure **must** be
chained to `pNext`

* 
[](#VUID-VkImageCreateInfo-multisampledRenderToSingleSampled-06882) VUID-VkImageCreateInfo-multisampledRenderToSingleSampled-06882

If the [    `multisampledRenderToSingleSampled`](features.html#features-multisampledRenderToSingleSampled) feature is not enabled,
`flags` **must** not contain
[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-flags-06883) VUID-VkImageCreateInfo-flags-06883

If `flags` contains
[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](#VkImageCreateFlagBits),
`samples` **must** be [VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-06743) VUID-VkImageCreateInfo-pNext-06743

If the `pNext` chain includes a [VkImageCompressionControlEXT](#VkImageCompressionControlEXT)
structure, `format` is a [multi-planar    format](formats.html#formats-multiplanar), and [VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`flags` includes
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#VkImageCompressionFlagBitsEXT), then
[VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`compressionControlPlaneCount`
**must** be equal to the number of planes in `format`

* 
[](#VUID-VkImageCreateInfo-pNext-06744) VUID-VkImageCreateInfo-pNext-06744

If the `pNext` chain includes a [VkImageCompressionControlEXT](#VkImageCompressionControlEXT)
structure, `format` is not a [multi-planar    format](formats.html#formats-multiplanar), and [VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`flags` includes
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#VkImageCompressionFlagBitsEXT), then
[VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`compressionControlPlaneCount`
**must** be 1

* 
[](#VUID-VkImageCreateInfo-pNext-06746) VUID-VkImageCreateInfo-pNext-06746

If the `pNext` chain includes a [VkImageCompressionControlEXT](#VkImageCompressionControlEXT)
structure, it **must** not contain a
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT) structure

* 
[](#VUID-VkImageCreateInfo-flags-08104) VUID-VkImageCreateInfo-flags-08104

    If `flags` includes
    [VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits), the
    [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay)
or
    [    `descriptorHeapCaptureReplay`](features.html#features-descriptorHeapCaptureReplay)
 feature **must** be enabled

* 
[](#VUID-VkImageCreateInfo-pNext-08105) VUID-VkImageCreateInfo-pNext-08105

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) structure, `flags`
**must** contain
[VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-06783) VUID-VkImageCreateInfo-pNext-06783

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT) structure, its
`exportObjectType` member **must** be either
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](memory.html#VkExportMetalObjectTypeFlagBitsEXT) or
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_IOSURFACE_BIT_EXT](memory.html#VkExportMetalObjectTypeFlagBitsEXT)

* 
[](#VUID-VkImageCreateInfo-pNext-06784) VUID-VkImageCreateInfo-pNext-06784

If the `pNext` chain includes a [VkImportMetalTextureInfoEXT](memory.html#VkImportMetalTextureInfoEXT)
structure its `plane` member **must** be
[VK_IMAGE_ASPECT_PLANE_0_BIT](#VkImageAspectFlagBits), [VK_IMAGE_ASPECT_PLANE_1_BIT](#VkImageAspectFlagBits), or
[VK_IMAGE_ASPECT_PLANE_2_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-06785) VUID-VkImageCreateInfo-pNext-06785

If the `pNext` chain includes a [VkImportMetalTextureInfoEXT](memory.html#VkImportMetalTextureInfoEXT)
structure and the image does not have a [    multi-planar format](formats.html#formats-multiplanar), then
[VkImportMetalTextureInfoEXT](memory.html#VkImportMetalTextureInfoEXT)::`plane` **must** be
[VK_IMAGE_ASPECT_PLANE_0_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-06786) VUID-VkImageCreateInfo-pNext-06786

If the `pNext` chain includes a [VkImportMetalTextureInfoEXT](memory.html#VkImportMetalTextureInfoEXT)
structure and the image has a [multi-planar    format](formats.html#formats-multiplanar) with only two planes, then
[VkImportMetalTextureInfoEXT](memory.html#VkImportMetalTextureInfoEXT)::`plane` **must** not be
[VK_IMAGE_ASPECT_PLANE_2_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-VkImageCreateInfo-imageCreateFormatFeatures-09048) VUID-VkImageCreateInfo-imageCreateFormatFeatures-09048

If `imageCreateFormatFeatures` (as defined in
[Image Creation Limits](#resources-image-creation-limits)) does not
contain [VK_FORMAT_FEATURE_2_HOST_IMAGE_TRANSFER_BIT](formats.html#VkFormatFeatureFlagBits2KHR), then
`usage` **must** not contain [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-usage-10245) VUID-VkImageCreateInfo-usage-10245

If `usage` includes [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](#VkImageUsageFlagBits), then the
[`hostImageCopy`](features.html#features-hostImageCopy) feature **must** be enabled

* 
[](#VUID-VkImageCreateInfo-tileMemoryHeap-10766) VUID-VkImageCreateInfo-tileMemoryHeap-10766

If the [`tileMemoryHeap`](features.html#features-tileMemoryHeap) feature is not
enabled, `usage` **must** not include
[VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](#VkImageUsageFlagBits)

* 
[](#VUID-VkImageCreateInfo-pNext-09653) VUID-VkImageCreateInfo-pNext-09653

If the `pNext` chain contains a
[VkImageAlignmentControlCreateInfoMESA](#VkImageAlignmentControlCreateInfoMESA) structure, `tiling`
**must** be [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling)

* 
[](#VUID-VkImageCreateInfo-pNext-09654) VUID-VkImageCreateInfo-pNext-09654

If the `pNext` chain contains a
[VkImageAlignmentControlCreateInfoMESA](#VkImageAlignmentControlCreateInfoMESA) structure, it **must** not
contain a [VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure

* 
[](#VUID-VkImageCreateInfo-tiling-09711) VUID-VkImageCreateInfo-tiling-09711

If `tiling` is VK_IMAGE_TILING_LINEAR then
[VK_IMAGE_USAGE_TENSOR_ALIASING_BIT_ARM](#VkImageUsageFlagBits) **must** not be set in
`usage`

* 
[](#VUID-VkImageCreateInfo-None-12279) VUID-VkImageCreateInfo-None-12279

    If
Vulkan 1.3 is not supported and
    the [`ycbcr2plane444Formats`](features.html#features-ycbcr2plane444Formats)
    feature is not enabled, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](formats.html#VkFormat),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](formats.html#VkFormat)

* 
[](#VUID-VkImageCreateInfo-flags-11281) VUID-VkImageCreateInfo-flags-11281

If [VkOpaqueCaptureDataCreateInfoEXT](#VkOpaqueCaptureDataCreateInfoEXT)::pData is not `NULL`,
`flags` **must** contain
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits)

* 
[](#VUID-VkImageCreateInfo-pData-11286) VUID-VkImageCreateInfo-pData-11286

If `flags` contains
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits), and
[VkOpaqueCaptureDataCreateInfoEXT](#VkOpaqueCaptureDataCreateInfoEXT)::`pData` is not `NULL`,
[VkOpaqueCaptureDataCreateInfoEXT](#VkOpaqueCaptureDataCreateInfoEXT)::`pData->size` **must** be equal
to [    `imageCaptureReplayOpaqueDataSize`](limits.html#limits-imageCaptureReplayOpaqueDataSize)

Valid Usage (Implicit)

* 
[](#VUID-VkImageCreateInfo-sType-sType) VUID-VkImageCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageCreateInfo-pNext-pNext) VUID-VkImageCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBufferCollectionImageCreateInfoFUCHSIA](#VkBufferCollectionImageCreateInfoFUCHSIA), [VkDedicatedAllocationImageCreateInfoNV](#VkDedicatedAllocationImageCreateInfoNV), [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT), [VkExternalFormatANDROID](#VkExternalFormatANDROID), [VkExternalFormatOHOS](#VkExternalFormatOHOS), [VkExternalFormatQNX](#VkExternalFormatQNX), [VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo), [VkExternalMemoryImageCreateInfoNV](#VkExternalMemoryImageCreateInfoNV), [VkImageAlignmentControlCreateInfoMESA](#VkImageAlignmentControlCreateInfoMESA), [VkImageCompressionControlEXT](#VkImageCompressionControlEXT), [VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT), [VkImageDrmFormatModifierListCreateInfoEXT](#VkImageDrmFormatModifierListCreateInfoEXT), [VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo), [VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo), [VkImageSwapchainCreateInfoKHR](#VkImageSwapchainCreateInfoKHR), [VkImportMetalIOSurfaceInfoEXT](memory.html#VkImportMetalIOSurfaceInfoEXT), [VkImportMetalTextureInfoEXT](memory.html#VkImportMetalTextureInfoEXT), [VkOpaqueCaptureDataCreateInfoEXT](#VkOpaqueCaptureDataCreateInfoEXT), [VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT), [VkOpticalFlowImageFormatInfoNV](VK_NV_optical_flow/optical_flow.html#VkOpticalFlowImageFormatInfoNV), or [VkVideoProfileListInfoKHR](videocoding.html#VkVideoProfileListInfoKHR)

* 
[](#VUID-VkImageCreateInfo-sType-unique) VUID-VkImageCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT) or [VkImportMetalTextureInfoEXT](memory.html#VkImportMetalTextureInfoEXT)

* 
[](#VUID-VkImageCreateInfo-flags-parameter) VUID-VkImageCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkImageCreateFlagBits](#VkImageCreateFlagBits) values

* 
[](#VUID-VkImageCreateInfo-imageType-parameter) VUID-VkImageCreateInfo-imageType-parameter

 `imageType` **must** be a valid [VkImageType](#VkImageType) value

* 
[](#VUID-VkImageCreateInfo-format-parameter) VUID-VkImageCreateInfo-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkImageCreateInfo-samples-parameter) VUID-VkImageCreateInfo-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](limits.html#VkSampleCountFlagBits) value

* 
[](#VUID-VkImageCreateInfo-tiling-parameter) VUID-VkImageCreateInfo-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](#VkImageTiling) value

* 
[](#VUID-VkImageCreateInfo-usage-parameter) VUID-VkImageCreateInfo-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](#VkImageUsageFlagBits) values

* 
[](#VUID-VkImageCreateInfo-usage-requiredbitmask) VUID-VkImageCreateInfo-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-VkImageCreateInfo-sharingMode-parameter) VUID-VkImageCreateInfo-sharingMode-parameter

 `sharingMode` **must** be a valid [VkSharingMode](#VkSharingMode) value

* 
[](#VUID-VkImageCreateInfo-initialLayout-parameter) VUID-VkImageCreateInfo-initialLayout-parameter

 `initialLayout` **must** be a valid [VkImageLayout](#VkImageLayout) value

The `VkBufferCollectionImageCreateInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferCollectionImageCreateInfoFUCHSIA {
    VkStructureType              sType;
    const void*                  pNext;
    VkBufferCollectionFUCHSIA    collection;
    uint32_t                     index;
} VkBufferCollectionImageCreateInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`collection` is the [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
`index` is the index of the buffer in the buffer collection from
which the memory will be imported

Valid Usage

* 
[](#VUID-VkBufferCollectionImageCreateInfoFUCHSIA-index-06391) VUID-VkBufferCollectionImageCreateInfoFUCHSIA-index-06391

`index` **must** be less than
[VkBufferCollectionPropertiesFUCHSIA](#VkBufferCollectionPropertiesFUCHSIA)::`bufferCount`

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCollectionImageCreateInfoFUCHSIA-sType-sType) VUID-VkBufferCollectionImageCreateInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COLLECTION_IMAGE_CREATE_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferCollectionImageCreateInfoFUCHSIA-collection-parameter) VUID-VkBufferCollectionImageCreateInfoFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

The `VkImageStencilUsageCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkImageStencilUsageCreateInfo {
    VkStructureType      sType;
    const void*          pNext;
    VkImageUsageFlags    stencilUsage;
} VkImageStencilUsageCreateInfo;

// Provided by VK_EXT_separate_stencil_usage
// Equivalent to VkImageStencilUsageCreateInfo
typedef VkImageStencilUsageCreateInfo VkImageStencilUsageCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stencilUsage` is a bitmask of [VkImageUsageFlagBits](#VkImageUsageFlagBits) describing
the intended usage of the stencil aspect of the image.

If the `pNext` chain of [VkImageCreateInfo](#VkImageCreateInfo) includes a
`VkImageStencilUsageCreateInfo` structure, then that structure includes
the usage flags specific to the stencil aspect of the image for an image
with a depth-stencil format.

This structure specifies image usages which only apply to the stencil aspect
of a depth/stencil format image.
When this structure is included in the `pNext` chain of
[VkImageCreateInfo](#VkImageCreateInfo), the stencil aspect of the image **must** only be used
as specified by `stencilUsage`.
When this structure is not included in the `pNext` chain of
[VkImageCreateInfo](#VkImageCreateInfo), the stencil aspect of an image **must** only be used
as specified by [VkImageCreateInfo](#VkImageCreateInfo)::`usage`.
Use of other aspects of an image are unaffected by this structure.

This structure **can** also be included in the `pNext` chain of
[VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2) to query additional capabilities
specific to image creation parameter combinations including a separate set
of usage flags for the stencil aspect of the image using
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2).
When this structure is not included in the `pNext` chain of
`VkPhysicalDeviceImageFormatInfo2` then the implicit value of
`stencilUsage` matches that of
`VkPhysicalDeviceImageFormatInfo2`::`usage`.

Valid Usage

* 
[](#VUID-VkImageStencilUsageCreateInfo-stencilUsage-02539) VUID-VkImageStencilUsageCreateInfo-stencilUsage-02539

If `stencilUsage` includes
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits), it **must** not include bits
other than [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkImageStencilUsageCreateInfo-sType-sType) VUID-VkImageStencilUsageCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_STENCIL_USAGE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageStencilUsageCreateInfo-stencilUsage-parameter) VUID-VkImageStencilUsageCreateInfo-stencilUsage-parameter

 `stencilUsage` **must** be a valid combination of [VkImageUsageFlagBits](#VkImageUsageFlagBits) values

* 
[](#VUID-VkImageStencilUsageCreateInfo-stencilUsage-requiredbitmask) VUID-VkImageStencilUsageCreateInfo-stencilUsage-requiredbitmask

 `stencilUsage` **must** not be `0`

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

* 
[VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2)

If the `pNext` chain includes a
`VkDedicatedAllocationImageCreateInfoNV` structure, then that structure
includes an enable controlling whether the image will have a dedicated
memory allocation bound to it.

The `VkDedicatedAllocationImageCreateInfoNV` structure is defined as:

// Provided by VK_NV_dedicated_allocation
typedef struct VkDedicatedAllocationImageCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBool32           dedicatedAllocation;
} VkDedicatedAllocationImageCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`dedicatedAllocation` specifies whether the image will have a
dedicated allocation bound to it.

|  | Using a dedicated allocation for color and depth/stencil attachments or
| --- | --- |
other large images **may** improve performance on some devices. |

Valid Usage

* 
[](#VUID-VkDedicatedAllocationImageCreateInfoNV-dedicatedAllocation-00994) VUID-VkDedicatedAllocationImageCreateInfoNV-dedicatedAllocation-00994

If `dedicatedAllocation` is [VK_TRUE](fundamentals.html#VK_TRUE),
[VkImageCreateInfo](#VkImageCreateInfo)::`flags` **must** not include
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](#VkImageCreateFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkDedicatedAllocationImageCreateInfoNV-sType-sType) VUID-VkDedicatedAllocationImageCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_IMAGE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

To define a set of external memory handle types that **may** be used as backing
store for an image, add a [VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure to
the `pNext` chain of the [VkImageCreateInfo](#VkImageCreateInfo) structure.
The `VkExternalMemoryImageCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExternalMemoryImageCreateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    VkExternalMemoryHandleTypeFlags    handleTypes;
} VkExternalMemoryImageCreateInfo;

// Provided by VK_KHR_external_memory
// Equivalent to VkExternalMemoryImageCreateInfo
typedef VkExternalMemoryImageCreateInfo VkExternalMemoryImageCreateInfoKHR;

|  | A `VkExternalMemoryImageCreateInfo` structure with a non-zero
| --- | --- |
`handleTypes` field must be included in the creation parameters for an
image that will be bound to memory that is either exported or imported. |

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is zero or a bitmask of
[VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) specifying one or more external
memory handle types.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalMemoryImageCreateInfo-sType-sType) VUID-VkExternalMemoryImageCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExternalMemoryImageCreateInfo-handleTypes-parameter) VUID-VkExternalMemoryImageCreateInfo-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

The `VkExternalFormatOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkExternalFormatOHOS {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           externalFormat;
} VkExternalFormatOHOS;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalFormat` is an implementation-defined identifier for the
external format.

To obtain additional format that are not provided by [VkFormat](formats.html#VkFormat) for an
Open Harmony OS hardware buffer, this structure should be included in the
pNext chain of another structure.
The return value of `externalFormat` indicates whether an additional
format exists.
If zero is returned, then no external format is used and other format
information should be used for implementations, and this is also true if
this structure is not present.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalFormatOHOS-sType-sType) VUID-VkExternalFormatOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_OHOS](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAttachmentDescription2](renderpass.html#VkAttachmentDescription2)

* 
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)

* 
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

* 
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)

To import memory created outside of the current Vulkan instance from an Open
Harmony OS native buffer, add a `VkImportNativeBufferInfoOHOS` structure
to the `pNext` chain of the [VkMemoryAllocateInfo](memory.html#VkMemoryAllocateInfo) structure.
The `VkImportNativeBufferInfoOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkImportNativeBufferInfoOHOS {
    VkStructureType            sType;
    const void*                pNext;
    struct OH_NativeBuffer*    buffer;
} VkImportNativeBufferInfoOHOS;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is a pointer to an `OH_NativeBuffer` structure.

A reference to the imported native buffer should be acquired by the
implementation if the [vkAllocateMemory](memory.html#vkAllocateMemory) command succeeds.
Then the reference **must** release when the device memory object is freed.
If the command fails, the implementation **must** not retain a reference.

Valid Usage (Implicit)

* 
[](#VUID-VkImportNativeBufferInfoOHOS-sType-sType) VUID-VkImportNativeBufferInfoOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_NATIVE_BUFFER_INFO_OHOS](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportNativeBufferInfoOHOS-buffer-parameter) VUID-VkImportNativeBufferInfoOHOS-buffer-parameter

 `buffer` **must** be a valid pointer to an `OH_NativeBuffer` value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](memory.html#VkMemoryAllocateInfo)

The `OH_NativeBuffer` structure is defined as:

// Provided by VK_OHOS_external_memory
struct OH_NativeBuffer;

It is the native buffer structure on Open Harmony OS platform.
It is defined in Open Harmony OS NDK headers.

To obtain optimal Open Harmony OS native buffer usage flags for specific
image creation parameters, add a `VkNativeBufferUsageOHOS` structure to
the `pNext` chain of a [VkImageFormatProperties2](capabilities.html#VkImageFormatProperties2) structure passed
to [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2).

The `VkNativeBufferUsageOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkNativeBufferUsageOHOS {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           OHOSNativeBufferUsage;
} VkNativeBufferUsageOHOS;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`OHOSNativeBufferUsage` returns the Open Harmony OS buffer usage
flags.

Valid Usage (Implicit)

* 
[](#VUID-VkNativeBufferUsageOHOS-sType-sType) VUID-VkNativeBufferUsageOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_NATIVE_BUFFER_USAGE_OHOS](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](capabilities.html#VkImageFormatProperties2)

To determine the memory parameters to use when importing an Open Harmony OS
native buffer:

// Provided by VK_OHOS_external_memory
VkResult vkGetNativeBufferPropertiesOHOS(
    VkDevice                                    device,
    const struct OH_NativeBuffer*               buffer,
    VkNativeBufferPropertiesOHOS*               pProperties);

* 
`device` is the logical device that will be importing `buffer`.

* 
`buffer` is the `OH_NativeBuffer` object specifies the buffer
for which its properties are to be queried.

* 
`pProperties` is a pointer to a [VkNativeBufferPropertiesOHOS](#VkNativeBufferPropertiesOHOS)
structure in which the properties of `buffer` are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetNativeBufferPropertiesOHOS-device-parameter) VUID-vkGetNativeBufferPropertiesOHOS-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetNativeBufferPropertiesOHOS-buffer-parameter) VUID-vkGetNativeBufferPropertiesOHOS-buffer-parameter

 `buffer` **must** be a valid pointer to a valid `OH_NativeBuffer` value

* 
[](#VUID-vkGetNativeBufferPropertiesOHOS-pProperties-parameter) VUID-vkGetNativeBufferPropertiesOHOS-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkNativeBufferPropertiesOHOS](#VkNativeBufferPropertiesOHOS) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To obtain an OH_NativeBuffer object, call:

// Provided by VK_OHOS_external_memory
VkResult vkGetMemoryNativeBufferOHOS(
    VkDevice                                    device,
    const VkMemoryGetNativeBufferInfoOHOS*      pInfo,
    struct OH_NativeBuffer**                    pBuffer);

* 
`device` is a valid Vulkan device object.

* 
`pInfo` is a pointer pointing to a
`VkMemoryGetNativeBufferInfoOHOS` structure.

* 
`pBuffer` is a pointer to an `OH_NativeBuffer` object.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryNativeBufferOHOS-device-parameter) VUID-vkGetMemoryNativeBufferOHOS-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryNativeBufferOHOS-pInfo-parameter) VUID-vkGetMemoryNativeBufferOHOS-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkMemoryGetNativeBufferInfoOHOS](#VkMemoryGetNativeBufferInfoOHOS) structure

* 
[](#VUID-vkGetMemoryNativeBufferOHOS-pBuffer-parameter) VUID-vkGetMemoryNativeBufferOHOS-pBuffer-parameter

 `pBuffer` **must** be a valid pointer to a valid pointer to an `OH_NativeBuffer` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkNativeBufferPropertiesOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkNativeBufferPropertiesOHOS {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       allocationSize;
    uint32_t           memoryTypeBits;
} VkNativeBufferPropertiesOHOS;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allocationSize` is the size of the external memory.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified Open Harmony OS native buffer **can** be
imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkNativeBufferPropertiesOHOS-sType-sType) VUID-VkNativeBufferPropertiesOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_NATIVE_BUFFER_PROPERTIES_OHOS](fundamentals.html#VkStructureType)

* 
[](#VUID-VkNativeBufferPropertiesOHOS-pNext-pNext) VUID-VkNativeBufferPropertiesOHOS-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkNativeBufferFormatPropertiesOHOS](#VkNativeBufferFormatPropertiesOHOS)

* 
[](#VUID-VkNativeBufferPropertiesOHOS-sType-unique) VUID-VkNativeBufferPropertiesOHOS-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

To obtain format properties of an Open Harmony OS native buffer, include a
`VkNativeBufferFormatPropertiesOHOS` structure in the `pNext` chain
of the [VkNativeBufferPropertiesOHOS](#VkNativeBufferPropertiesOHOS) structure passed to
[vkGetNativeBufferPropertiesOHOS](#vkGetNativeBufferPropertiesOHOS).
The `VkNativeBufferFormatPropertiesOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkNativeBufferFormatPropertiesOHOS {
    VkStructureType                  sType;
    void*                            pNext;
    VkFormat                         format;
    uint64_t                         externalFormat;
    VkFormatFeatureFlags             formatFeatures;
    VkComponentMapping               samplerYcbcrConversionComponents;
    VkSamplerYcbcrModelConversion    suggestedYcbcrModel;
    VkSamplerYcbcrRange              suggestedYcbcrRange;
    VkChromaLocation                 suggestedXChromaOffset;
    VkChromaLocation                 suggestedYChromaOffset;
} VkNativeBufferFormatPropertiesOHOS;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the Vulkan format corresponding to the Open Harmony OS
native buffer’s format, or [VK_FORMAT_UNDEFINED](formats.html#VkFormat) if there is not an
equivalent Vulkan format.

* 
`externalFormat` is an implementation-defined external format
identifier for use with [VkExternalFormatOHOS](#VkExternalFormatOHOS).

* 
`formatFeatures` describes the capabilities of this external format
when used with an image bound to memory imported from `buffer`.

* 
`samplerYcbcrConversionComponents` represents a set of
[VkComponentSwizzle](#VkComponentSwizzle).

* 
`suggestedYcbcrModel` represents the color model.

* 
`suggestedYcbcrRange` represents the numerical value range.

* 
`suggestedXChromaOffset` represents the X chroma offset.

* 
`suggestedYChromaOffset` represents the Y chroma offset.

Valid Usage (Implicit)

* 
[](#VUID-VkNativeBufferFormatPropertiesOHOS-sType-sType) VUID-VkNativeBufferFormatPropertiesOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_NATIVE_BUFFER_FORMAT_PROPERTIES_OHOS](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkNativeBufferPropertiesOHOS](#VkNativeBufferPropertiesOHOS)

The `VkMemoryGetNativeBufferInfoOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkMemoryGetNativeBufferInfoOHOS {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
} VkMemoryGetNativeBufferInfoOHOS;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is a valid `VkDeviceMemory` object from which the Open
Harmony OS native buffer will be exported.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetNativeBufferInfoOHOS-sType-sType) VUID-VkMemoryGetNativeBufferInfoOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_NATIVE_BUFFER_INFO_OHOS](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryGetNativeBufferInfoOHOS-pNext-pNext) VUID-VkMemoryGetNativeBufferInfoOHOS-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetNativeBufferInfoOHOS-memory-parameter) VUID-VkMemoryGetNativeBufferInfoOHOS-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](memory.html#VkDeviceMemory) handle

If the `pNext` chain includes a `VkExternalMemoryImageCreateInfoNV`
structure, then that structure defines a set of external memory handle types
that **may** be used as backing store for the image.

The `VkExternalMemoryImageCreateInfoNV` structure is defined as:

// Provided by VK_NV_external_memory
typedef struct VkExternalMemoryImageCreateInfoNV {
    VkStructureType                      sType;
    const void*                          pNext;
    VkExternalMemoryHandleTypeFlagsNV    handleTypes;
} VkExternalMemoryImageCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is zero or a bitmask of
[VkExternalMemoryHandleTypeFlagBitsNV](memory.html#VkExternalMemoryHandleTypeFlagBitsNV) specifying one or more
external memory handle types.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalMemoryImageCreateInfoNV-sType-sType) VUID-VkExternalMemoryImageCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExternalMemoryImageCreateInfoNV-handleTypes-parameter) VUID-VkExternalMemoryImageCreateInfoNV-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBitsNV](memory.html#VkExternalMemoryHandleTypeFlagBitsNV) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

`VkExternalFormatANDROID` is defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkExternalFormatANDROID {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           externalFormat;
} VkExternalFormatANDROID;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalFormat` is an implementation-defined identifier for the
external format

When included in the `pNext` chain of another structure, it indicates
[additional format information](memory.html#memory-external-android-hardware-buffer-external-formats) beyond what is provided by [VkFormat](formats.html#VkFormat) values for an
Android hardware buffer.
If `externalFormat` is zero, it indicates that no external format is
used, and implementations should rely only on other format information.
If this structure is not present, it is equivalent to setting
`externalFormat` to zero.

Valid Usage

* 
[](#VUID-VkExternalFormatANDROID-externalFormat-01894) VUID-VkExternalFormatANDROID-externalFormat-01894

`externalFormat` **must** be `0` or a value returned in the
`externalFormat` member of
[VkAndroidHardwareBufferFormatPropertiesANDROID](memory.html#VkAndroidHardwareBufferFormatPropertiesANDROID) by an earlier call
to [vkGetAndroidHardwareBufferPropertiesANDROID](memory.html#vkGetAndroidHardwareBufferPropertiesANDROID)

Valid Usage (Implicit)

* 
[](#VUID-VkExternalFormatANDROID-sType-sType) VUID-VkExternalFormatANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_ANDROID](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAttachmentDescription2](renderpass.html#VkAttachmentDescription2)

* 
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)

* 
[VkGraphicsPipelineCreateInfo](pipelines.html#VkGraphicsPipelineCreateInfo)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

* 
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)

To create an image with an
[QNX Screen external format](memory.html#memory-external-screen-buffer-external-formats), add a `VkExternalFormatQNX` structure in the `pNext` chain
of [VkImageCreateInfo](#VkImageCreateInfo).
`VkExternalFormatQNX` is defined as:

// Provided by VK_QNX_external_memory_screen_buffer
typedef struct VkExternalFormatQNX {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           externalFormat;
} VkExternalFormatQNX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalFormat` is an implementation-defined identifier for the
external format

If `externalFormat` is zero, the effect is as if the
`VkExternalFormatQNX` structure was not present.
Otherwise, the `image` will have the specified external format.

Valid Usage

* 
[](#VUID-VkExternalFormatQNX-externalFormat-08956) VUID-VkExternalFormatQNX-externalFormat-08956

`externalFormat` **must** be `0` or a value returned in the
`externalFormat` member of [VkScreenBufferFormatPropertiesQNX](memory.html#VkScreenBufferFormatPropertiesQNX)
by an earlier call to [vkGetScreenBufferPropertiesQNX](memory.html#vkGetScreenBufferPropertiesQNX)

Valid Usage (Implicit)

* 
[](#VUID-VkExternalFormatQNX-sType-sType) VUID-VkExternalFormatQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_QNX](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

* 
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)

If the `pNext` chain of [VkImageCreateInfo](#VkImageCreateInfo) includes a
`VkImageSwapchainCreateInfoKHR` structure, then that structure includes
a swapchain handle indicating that the image will be bound to memory from
that swapchain.

The `VkImageSwapchainCreateInfoKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
typedef struct VkImageSwapchainCreateInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkSwapchainKHR     swapchain;
} VkImageSwapchainCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchain` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a handle of a swapchain that
the image will be bound to.

Valid Usage

* 
[](#VUID-VkImageSwapchainCreateInfoKHR-swapchain-00995) VUID-VkImageSwapchainCreateInfoKHR-swapchain-00995

If `swapchain` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the fields of
[VkImageCreateInfo](#VkImageCreateInfo) **must** match the
[implied image creation parameters](VK_KHR_surface/wsi.html#swapchain-wsi-image-create-info)
of the swapchain

Valid Usage (Implicit)

* 
[](#VUID-VkImageSwapchainCreateInfoKHR-sType-sType) VUID-VkImageSwapchainCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_SWAPCHAIN_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageSwapchainCreateInfoKHR-swapchain-parameter) VUID-VkImageSwapchainCreateInfoKHR-swapchain-parameter

 If `swapchain` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `swapchain` **must** be a valid [VkSwapchainKHR](VK_KHR_surface/wsi.html#VkSwapchainKHR) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

If the `pNext` chain of [VkImageCreateInfo](#VkImageCreateInfo) includes a
`VkImageFormatListCreateInfo` structure, then that structure contains a
list of all formats that **can** be used when creating views of this image.

The `VkImageFormatListCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkImageFormatListCreateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           viewFormatCount;
    const VkFormat*    pViewFormats;
} VkImageFormatListCreateInfo;

// Provided by VK_KHR_image_format_list
// Equivalent to VkImageFormatListCreateInfo
typedef VkImageFormatListCreateInfo VkImageFormatListCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`viewFormatCount` is the number of entries in the `pViewFormats`
array.

* 
`pViewFormats` is a pointer to an array of [VkFormat](formats.html#VkFormat) values
specifying all formats which **can** be used when creating views of this
image.

If `viewFormatCount` is zero, `pViewFormats` is ignored and the
image is created as if the `VkImageFormatListCreateInfo` structure were
not included in the `pNext` chain of [VkImageCreateInfo](#VkImageCreateInfo).

Valid Usage

* 
[](#VUID-VkImageFormatListCreateInfo-viewFormatCount-09540) VUID-VkImageFormatListCreateInfo-viewFormatCount-09540

If `viewFormatCount` is not 0, each element of `pViewFormats`
**must** not be [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

Valid Usage (Implicit)

* 
[](#VUID-VkImageFormatListCreateInfo-sType-sType) VUID-VkImageFormatListCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_FORMAT_LIST_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageFormatListCreateInfo-pViewFormats-parameter) VUID-VkImageFormatListCreateInfo-pViewFormats-parameter

 If `viewFormatCount` is not `0`, `pViewFormats` **must** be a valid pointer to an array of `viewFormatCount` valid [VkFormat](formats.html#VkFormat) values

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

* 
[VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2)

* 
[VkSwapchainCreateInfoKHR](VK_KHR_surface/wsi.html#VkSwapchainCreateInfoKHR)

If the `pNext` chain of [VkImageCreateInfo](#VkImageCreateInfo) includes a
[VkImageDrmFormatModifierListCreateInfoEXT](#VkImageDrmFormatModifierListCreateInfoEXT) structure, then the image
will be created with one of the [Linux DRM format modifiers](../appendices/glossary.html#glossary-drm-format-modifier) listed in the structure.
The choice of modifier is implementation-dependent.

The [VkImageDrmFormatModifierListCreateInfoEXT](#VkImageDrmFormatModifierListCreateInfoEXT) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkImageDrmFormatModifierListCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           drmFormatModifierCount;
    const uint64_t*    pDrmFormatModifiers;
} VkImageDrmFormatModifierListCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifierCount` is the length of the
`pDrmFormatModifiers` array.

* 
`pDrmFormatModifiers` is a pointer to an array of *Linux DRM format
modifiers*.

Valid Usage

* 
[](#VUID-VkImageDrmFormatModifierListCreateInfoEXT-pDrmFormatModifiers-02263) VUID-VkImageDrmFormatModifierListCreateInfoEXT-pDrmFormatModifiers-02263

Each *modifier* in `pDrmFormatModifiers` **must** be compatible with
the parameters in [VkImageCreateInfo](#VkImageCreateInfo) and its `pNext` chain, as
determined by querying [VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2) extended
with [VkPhysicalDeviceImageDrmFormatModifierInfoEXT](capabilities.html#VkPhysicalDeviceImageDrmFormatModifierInfoEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkImageDrmFormatModifierListCreateInfoEXT-sType-sType) VUID-VkImageDrmFormatModifierListCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_DRM_FORMAT_MODIFIER_LIST_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageDrmFormatModifierListCreateInfoEXT-pDrmFormatModifiers-parameter) VUID-VkImageDrmFormatModifierListCreateInfoEXT-pDrmFormatModifiers-parameter

 `pDrmFormatModifiers` **must** be a valid pointer to an array of `drmFormatModifierCount` `uint64_t` values

* 
[](#VUID-VkImageDrmFormatModifierListCreateInfoEXT-drmFormatModifierCount-arraylength) VUID-VkImageDrmFormatModifierListCreateInfoEXT-drmFormatModifierCount-arraylength

 `drmFormatModifierCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

If the `pNext` chain of [VkImageCreateInfo](#VkImageCreateInfo) includes a
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT) structure, then the
image will be created with the [Linux DRM format modifier](../appendices/glossary.html#glossary-drm-format-modifier) and memory layout defined by the structure.

The [VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT) structure is defined
as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkImageDrmFormatModifierExplicitCreateInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    uint64_t                      drmFormatModifier;
    uint32_t                      drmFormatModifierPlaneCount;
    const VkSubresourceLayout*    pPlaneLayouts;
} VkImageDrmFormatModifierExplicitCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifier` is the *Linux DRM format modifier* with which
the image will be created.

* 
`drmFormatModifierPlaneCount` is the number of *memory planes* in
the image (as reported by [VkDrmFormatModifierPropertiesEXT](formats.html#VkDrmFormatModifierPropertiesEXT)) as
well as the length of the `pPlaneLayouts` array.

* 
`pPlaneLayouts` is a pointer to an array of
[VkSubresourceLayout](#VkSubresourceLayout) structures describing the image’s *memory
planes*.

The `i`th member of `pPlaneLayouts` describes the layout of the
image’s `i`th *memory plane* (that is,
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT`).
In each element of `pPlaneLayouts`, the implementation **must** ignore
`size`.
The implementation calculates the size of each plane, which the application
**can** query with [vkGetImageSubresourceLayout](#vkGetImageSubresourceLayout).

When creating an image with
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT), it is the application’s
responsibility to satisfy all valid usage requirements.
However, the implementation **must** validate that the provided
`pPlaneLayouts`, when combined with the provided `drmFormatModifier`
and other creation parameters in [VkImageCreateInfo](#VkImageCreateInfo) and its `pNext`
chain, produce a valid image.
(This validation is necessarily implementation-dependent and outside the
scope of Vulkan, and therefore not described by valid usage requirements).
If this validation fails, then [vkCreateImage](#vkCreateImage) returns
[VK_ERROR_INVALID_DRM_FORMAT_MODIFIER_PLANE_LAYOUT_EXT](fundamentals.html#VkResult).

Valid Usage

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifier-02264) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifier-02264

`drmFormatModifier` **must** be compatible with the parameters in
[VkImageCreateInfo](#VkImageCreateInfo) and its `pNext` chain, as determined by
querying [VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2) extended with
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](capabilities.html#VkPhysicalDeviceImageDrmFormatModifierInfoEXT)

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifierPlaneCount-02265) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifierPlaneCount-02265

`drmFormatModifierPlaneCount` **must** be equal to the
[VkDrmFormatModifierPropertiesEXT](formats.html#VkDrmFormatModifierPropertiesEXT)::`drmFormatModifierPlaneCount`
associated with [VkImageCreateInfo](#VkImageCreateInfo)::`format` and
`drmFormatModifier`, as found by querying
[VkDrmFormatModifierPropertiesListEXT](formats.html#VkDrmFormatModifierPropertiesListEXT)

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-size-02267) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-size-02267

For each element of `pPlaneLayouts`, `size` **must** be 0

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-arrayPitch-02268) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-arrayPitch-02268

For each element of `pPlaneLayouts`, `arrayPitch` **must** be 0 if
[VkImageCreateInfo](#VkImageCreateInfo)::`arrayLayers` is 1

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-depthPitch-02269) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-depthPitch-02269

For each element of `pPlaneLayouts`, `depthPitch` **must** be 0 if
[VkImageCreateInfo](#VkImageCreateInfo)::`extent.depth` is 1

Valid Usage (Implicit)

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-sType-sType) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_DRM_FORMAT_MODIFIER_EXPLICIT_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-pPlaneLayouts-parameter) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-pPlaneLayouts-parameter

 `pPlaneLayouts` **must** be a valid pointer to an array of `drmFormatModifierPlaneCount` [VkSubresourceLayout](#VkSubresourceLayout) structures

* 
[](#VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifierPlaneCount-arraylength) VUID-VkImageDrmFormatModifierExplicitCreateInfoEXT-drmFormatModifierPlaneCount-arraylength

 `drmFormatModifierPlaneCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

If the `pNext` list of [VkImageCreateInfo](#VkImageCreateInfo) includes a
`VkImageCompressionControlEXT` structure, then that structure describes
compression controls for this image.

The `VkImageCompressionControlEXT` structure is defined as:

// Provided by VK_EXT_image_compression_control
typedef struct VkImageCompressionControlEXT {
    VkStructureType                         sType;
    const void*                             pNext;
    VkImageCompressionFlagsEXT              flags;
    uint32_t                                compressionControlPlaneCount;
    VkImageCompressionFixedRateFlagsEXT*    pFixedRateFlags;
} VkImageCompressionControlEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkImageCompressionFlagBitsEXT](#VkImageCompressionFlagBitsEXT)
describing compression controls for the image.

* 
`compressionControlPlaneCount` is the number of entries in the
`pFixedRateFlags` array.

* 
`pFixedRateFlags` is `NULL` or a pointer to an array of
[VkImageCompressionFixedRateFlagsEXT](#VkImageCompressionFixedRateFlagsEXT) bitfields describing allowed
fixed-rate compression rates of each image plane.
It is ignored if `flags` does not include
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#VkImageCompressionFlagBitsEXT).

If enabled, fixed-rate compression is done in an implementation-defined
manner and **may** be applied at block granularity.
In that case, a write to an individual texel **may** modify the value of other
texels in the same block.

Valid Usage

* 
[](#VUID-VkImageCompressionControlEXT-flags-06747) VUID-VkImageCompressionControlEXT-flags-06747

`flags` **must** be one of [VK_IMAGE_COMPRESSION_DEFAULT_EXT](#VkImageCompressionFlagBitsEXT),
[VK_IMAGE_COMPRESSION_FIXED_RATE_DEFAULT_EXT](#VkImageCompressionFlagBitsEXT),
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#VkImageCompressionFlagBitsEXT), or
[VK_IMAGE_COMPRESSION_DISABLED_EXT](#VkImageCompressionFlagBitsEXT)

* 
[](#VUID-VkImageCompressionControlEXT-flags-06748) VUID-VkImageCompressionControlEXT-flags-06748

If `flags` includes
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#VkImageCompressionFlagBitsEXT),
`pFixedRateFlags` **must** not be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-VkImageCompressionControlEXT-sType-sType) VUID-VkImageCompressionControlEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_COMPRESSION_CONTROL_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

* 
[VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2)

* 
[VkSwapchainCreateInfoKHR](VK_KHR_surface/wsi.html#VkSwapchainCreateInfoKHR)

|  | Some combinations of compression properties may not be supported.
| --- | --- |
For example, some implementations may not support different fixed-rate
compression rates per plane of a [multi-planar format](formats.html#formats-multiplanar) and will not be able to enable fixed-rate compression for any plane
if the requested rates differ. |

Possible values of [VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`flags`,
specifying compression controls for an image, are:

// Provided by VK_EXT_image_compression_control
typedef enum VkImageCompressionFlagBitsEXT {
    VK_IMAGE_COMPRESSION_DEFAULT_EXT = 0,
    VK_IMAGE_COMPRESSION_FIXED_RATE_DEFAULT_EXT = 0x00000001,
    VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT = 0x00000002,
    VK_IMAGE_COMPRESSION_DISABLED_EXT = 0x00000004,
} VkImageCompressionFlagBitsEXT;

* 
[VK_IMAGE_COMPRESSION_DEFAULT_EXT](#VkImageCompressionFlagBitsEXT) specifies that the default image
compression setting is used.
Implementations **must** not apply fixed-rate compression.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_DEFAULT_EXT](#VkImageCompressionFlagBitsEXT) specifies that the
implementation **may** choose any supported fixed-rate compression setting
in an implementation-defined manner based on the properties of the
image.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#VkImageCompressionFlagBitsEXT) specifies that
fixed-rate compression **may** be used and that the allowed compression
rates are specified by
[VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`pFixedRateFlags`.

* 
[VK_IMAGE_COMPRESSION_DISABLED_EXT](#VkImageCompressionFlagBitsEXT) specifies that all lossless and
fixed-rate compression **should** be disabled.

If [VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`flags` is
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#VkImageCompressionFlagBitsEXT), then the `i`th
member of the `pFixedRateFlags` array specifies the allowed compression
rates for the image’s `i`th plane.

|  | If [VK_IMAGE_COMPRESSION_DISABLED_EXT](#VkImageCompressionFlagBitsEXT) is included in
| --- | --- |
[VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`flags`, both lossless and
fixed-rate compression will be disabled.
This is likely to have a negative impact on performance and is only intended
to be used for debugging purposes. |

// Provided by VK_EXT_image_compression_control
typedef VkFlags VkImageCompressionFlagsEXT;

`VkImageCompressionFlagsEXT` is a bitmask type for setting a mask of
zero or more [VkImageCompressionFlagBitsEXT](#VkImageCompressionFlagBitsEXT).

// Provided by VK_EXT_image_compression_control
typedef VkFlags VkImageCompressionFixedRateFlagsEXT;

`VkImageCompressionFixedRateFlagsEXT` is a bitmask type for setting a
mask of zero or more [VkImageCompressionFixedRateFlagBitsEXT](#VkImageCompressionFixedRateFlagBitsEXT).

Bits which **can** be set in
[VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`pFixedRateFlags`, specifying
allowed compression rates for an image plane, are:

// Provided by VK_EXT_image_compression_control
typedef enum VkImageCompressionFixedRateFlagBitsEXT {
    VK_IMAGE_COMPRESSION_FIXED_RATE_NONE_EXT = 0,
    VK_IMAGE_COMPRESSION_FIXED_RATE_1BPC_BIT_EXT = 0x00000001,
    VK_IMAGE_COMPRESSION_FIXED_RATE_2BPC_BIT_EXT = 0x00000002,
    VK_IMAGE_COMPRESSION_FIXED_RATE_3BPC_BIT_EXT = 0x00000004,
    VK_IMAGE_COMPRESSION_FIXED_RATE_4BPC_BIT_EXT = 0x00000008,
    VK_IMAGE_COMPRESSION_FIXED_RATE_5BPC_BIT_EXT = 0x00000010,
    VK_IMAGE_COMPRESSION_FIXED_RATE_6BPC_BIT_EXT = 0x00000020,
    VK_IMAGE_COMPRESSION_FIXED_RATE_7BPC_BIT_EXT = 0x00000040,
    VK_IMAGE_COMPRESSION_FIXED_RATE_8BPC_BIT_EXT = 0x00000080,
    VK_IMAGE_COMPRESSION_FIXED_RATE_9BPC_BIT_EXT = 0x00000100,
    VK_IMAGE_COMPRESSION_FIXED_RATE_10BPC_BIT_EXT = 0x00000200,
    VK_IMAGE_COMPRESSION_FIXED_RATE_11BPC_BIT_EXT = 0x00000400,
    VK_IMAGE_COMPRESSION_FIXED_RATE_12BPC_BIT_EXT = 0x00000800,
    VK_IMAGE_COMPRESSION_FIXED_RATE_13BPC_BIT_EXT = 0x00001000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_14BPC_BIT_EXT = 0x00002000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_15BPC_BIT_EXT = 0x00004000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_16BPC_BIT_EXT = 0x00008000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_17BPC_BIT_EXT = 0x00010000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_18BPC_BIT_EXT = 0x00020000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_19BPC_BIT_EXT = 0x00040000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_20BPC_BIT_EXT = 0x00080000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_21BPC_BIT_EXT = 0x00100000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_22BPC_BIT_EXT = 0x00200000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_23BPC_BIT_EXT = 0x00400000,
    VK_IMAGE_COMPRESSION_FIXED_RATE_24BPC_BIT_EXT = 0x00800000,
} VkImageCompressionFixedRateFlagBitsEXT;

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_NONE_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that fixed-rate
compression **must** not be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_1BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [1,2) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_2BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [2,3) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_3BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [3,4) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_4BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [4,5) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_5BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [5,6) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_6BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [6,7) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_7BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [7,8) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_8BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [8,9) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_9BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [9,10) bits per component
**may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_10BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [10,11) bits per
component **may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_11BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of [11,12) bits per
component **may** be used.

* 
[VK_IMAGE_COMPRESSION_FIXED_RATE_12BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) specifies that
fixed-rate compression with a bitrate of at least 12 bits per component
**may** be used.

If the format has a different bit rate for different components,
[VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`pFixedRateFlags` describes the rate
of the component with the largest number of bits assigned to it, scaled pro
rata.
For example, to request that a [VK_FORMAT_A2R10G10B10_UNORM_PACK32](formats.html#VkFormat)
format be stored at a rate of 8 bits per pixel, use
[VK_IMAGE_COMPRESSION_FIXED_RATE_2BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT) (10 bits for the largest
component, stored at quarter the original size, 2.5 bits, rounded down).

If `flags` includes [VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#VkImageCompressionFlagBitsEXT),
and multiple bits are set in
[VkImageCompressionControlEXT](#VkImageCompressionControlEXT)::`pFixedRateFlags` for a plane,
implementations **should** apply the lowest allowed bitrate that is supported.

|  | The choice of “bits per component” terminology was chosen so that the same
| --- | --- |
compression rate describes the same degree of compression applied to formats
that differ only in the number of components.
For example, [VK_FORMAT_R8G8_UNORM](formats.html#VkFormat) compressed to half its original size
is a rate of 4 bits per component, 8 bits per pixel.
[VK_FORMAT_R8G8B8A8_UNORM](formats.html#VkFormat) compressed to half *its* original size is 4
bits per component, 16 bits per pixel.
Both of these cases can be requested with
[VK_IMAGE_COMPRESSION_FIXED_RATE_4BPC_BIT_EXT](#VkImageCompressionFixedRateFlagBitsEXT). |

To query the compression properties of an image, add a
[VkImageCompressionPropertiesEXT](#VkImageCompressionPropertiesEXT) structure to the `pNext` chain of
the [VkSubresourceLayout2](#VkSubresourceLayout2) structure in a call to
[vkGetImageSubresourceLayout2](#vkGetImageSubresourceLayout2).

To determine the compression rates that are supported for a given image
format, add a [VkImageCompressionPropertiesEXT](#VkImageCompressionPropertiesEXT) structure to the
`pNext` chain of the [VkImageFormatProperties2](capabilities.html#VkImageFormatProperties2) structure in a call
to [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2).

|  | Since fixed-rate compression is disabled by default, the
| --- | --- |
[VkImageCompressionPropertiesEXT](#VkImageCompressionPropertiesEXT) structure passed to
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) will not indicate any
fixed-rate compression support unless a [VkImageCompressionControlEXT](#VkImageCompressionControlEXT)
structure is also included in the `pNext` chain of the
[VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2) structure passed to the same command. |

The `VkImageCompressionPropertiesEXT` structure is defined as:

// Provided by VK_EXT_image_compression_control
typedef struct VkImageCompressionPropertiesEXT {
    VkStructureType                        sType;
    void*                                  pNext;
    VkImageCompressionFlagsEXT             imageCompressionFlags;
    VkImageCompressionFixedRateFlagsEXT    imageCompressionFixedRateFlags;
} VkImageCompressionPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageCompressionFlags` returns a value describing the compression
controls that apply to the image.
The value will be either [VK_IMAGE_COMPRESSION_DEFAULT_EXT](#VkImageCompressionFlagBitsEXT) to
indicate no fixed-rate compression,
[VK_IMAGE_COMPRESSION_FIXED_RATE_EXPLICIT_EXT](#VkImageCompressionFlagBitsEXT) to indicate
fixed-rate compression, or [VK_IMAGE_COMPRESSION_DISABLED_EXT](#VkImageCompressionFlagBitsEXT) to
indicate no compression.

* 
`imageCompressionFixedRateFlags` returns a
[VkImageCompressionFixedRateFlagsEXT](#VkImageCompressionFixedRateFlagsEXT) value describing the
compression rates that apply to the specified aspect of the image.

Valid Usage (Implicit)

* 
[](#VUID-VkImageCompressionPropertiesEXT-sType-sType) VUID-VkImageCompressionPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_COMPRESSION_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](capabilities.html#VkImageFormatProperties2)

* 
[VkSubresourceLayout2](#VkSubresourceLayout2)

* 
[VkSurfaceFormat2KHR](VK_KHR_surface/wsi.html#VkSurfaceFormat2KHR)

If the `pNext` list of [VkImageCreateInfo](#VkImageCreateInfo) includes a
`VkImageAlignmentControlCreateInfoMESA` structure, then that structure
describes desired alignment for this image.

The `VkImageAlignmentControlCreateInfoMESA` structure is defined as:

// Provided by VK_MESA_image_alignment_control
typedef struct VkImageAlignmentControlCreateInfoMESA {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           maximumRequestedAlignment;
} VkImageAlignmentControlCreateInfoMESA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maximumRequestedAlignment` specifies the maximum alignment for the
image.

If `maximumRequestedAlignment` is not 0, the implementation **should**
choose an image memory layout that requires an alignment no larger than
`maximumRequestedAlignment` as reported in
[VkMemoryRequirements](#VkMemoryRequirements)::`alignment`.
If such a layout does not exist for the given image creation parameters, the
implementation **should** return the smallest alignment which is supported in
[VkMemoryRequirements](#VkMemoryRequirements).

If an implementation needs to disable image compression for
`maximumRequestedAlignment` to be honored - where a larger alignment
would enable image compression - the implementation **should** not use
`maximumRequestedAlignment`, and **should** return the smallest alignment
which does not compromise compression.
If the [`imageCompressionControl`](features.html#features-imageCompressionControl)
feature is enabled, the application **can** chain a
[VkImageCompressionControlEXT](#VkImageCompressionControlEXT) with
[VK_IMAGE_COMPRESSION_DISABLED_EXT](#VkImageCompressionFlagBitsEXT).
In this case, image compression considerations **should** not apply when
implementation decides alignment.

Valid Usage

* 
[](#VUID-VkImageAlignmentControlCreateInfoMESA-maximumRequestedAlignment-09655) VUID-VkImageAlignmentControlCreateInfoMESA-maximumRequestedAlignment-09655

If `maximumRequestedAlignment` is not 0,
`maximumRequestedAlignment` **must** be a power of two

* 
[](#VUID-VkImageAlignmentControlCreateInfoMESA-maximumRequestedAlignment-09656) VUID-VkImageAlignmentControlCreateInfoMESA-maximumRequestedAlignment-09656

If `maximumRequestedAlignment` is not 0, the bitwise-and of
`maximumRequestedAlignment` and
[`supportedImageAlignmentMask`](limits.html#limits-supportedImageAlignmentMask)
**must** be non-zero

* 
[](#VUID-VkImageAlignmentControlCreateInfoMESA-imageAlignmentControl-09657) VUID-VkImageAlignmentControlCreateInfoMESA-imageAlignmentControl-09657

[`imageAlignmentControl`](features.html#features-imageAlignmentControl) **must** be
enabled

Valid Usage (Implicit)

* 
[](#VUID-VkImageAlignmentControlCreateInfoMESA-sType-sType) VUID-VkImageAlignmentControlCreateInfoMESA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_ALIGNMENT_CONTROL_CREATE_INFO_MESA](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

Bits which **can** be set in

* 
[VkImageViewUsageCreateInfo](#VkImageViewUsageCreateInfo)::`usage`

* 
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo)::`stencilUsage`

* 
[VkImageCreateInfo](#VkImageCreateInfo)::`usage`

specify intended usage of an image, and are:

// Provided by VK_VERSION_1_0
typedef enum VkImageUsageFlagBits {
    VK_IMAGE_USAGE_TRANSFER_SRC_BIT = 0x00000001,
    VK_IMAGE_USAGE_TRANSFER_DST_BIT = 0x00000002,
    VK_IMAGE_USAGE_SAMPLED_BIT = 0x00000004,
    VK_IMAGE_USAGE_STORAGE_BIT = 0x00000008,
    VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT = 0x00000010,
    VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT = 0x00000020,
    VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT = 0x00000040,
    VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT = 0x00000080,
  // Provided by VK_VERSION_1_4
    VK_IMAGE_USAGE_HOST_TRANSFER_BIT = 0x00400000,
  // Provided by VK_KHR_video_decode_queue
    VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR = 0x00000400,
  // Provided by VK_KHR_video_decode_queue
    VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR = 0x00000800,
  // Provided by VK_KHR_video_decode_queue
    VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR = 0x00001000,
  // Provided by VK_EXT_fragment_density_map
    VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT = 0x00000200,
  // Provided by VK_KHR_fragment_shading_rate
    VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR = 0x00000100,
  // Provided by VK_KHR_video_encode_queue
    VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR = 0x00002000,
  // Provided by VK_KHR_video_encode_queue
    VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR = 0x00004000,
  // Provided by VK_KHR_video_encode_queue
    VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR = 0x00008000,
  // Provided by VK_EXT_attachment_feedback_loop_layout
    VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT = 0x00080000,
  // Provided by VK_HUAWEI_invocation_mask
    VK_IMAGE_USAGE_INVOCATION_MASK_BIT_HUAWEI = 0x00040000,
  // Provided by VK_QCOM_image_processing
    VK_IMAGE_USAGE_SAMPLE_WEIGHT_BIT_QCOM = 0x00100000,
  // Provided by VK_QCOM_image_processing
    VK_IMAGE_USAGE_SAMPLE_BLOCK_MATCH_BIT_QCOM = 0x00200000,
  // Provided by VK_ARM_tensors
    VK_IMAGE_USAGE_TENSOR_ALIASING_BIT_ARM = 0x00800000,
  // Provided by VK_QCOM_tile_memory_heap
    VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM = 0x08000000,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR = 0x02000000,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR = 0x04000000,
  // Provided by VK_NV_shading_rate_image
    VK_IMAGE_USAGE_SHADING_RATE_IMAGE_BIT_NV = VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR,
  // Provided by VK_EXT_host_image_copy
    VK_IMAGE_USAGE_HOST_TRANSFER_BIT_EXT = VK_IMAGE_USAGE_HOST_TRANSFER_BIT,
} VkImageUsageFlagBits;

* 
[VK_IMAGE_USAGE_TRANSFER_SRC_BIT](#VkImageUsageFlagBits) specifies that the image **can** be
used as the source of a transfer command.

* 
[VK_IMAGE_USAGE_TRANSFER_DST_BIT](#VkImageUsageFlagBits) specifies that the image **can** be
used as the destination of a transfer command.

* 
[VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits) specifies that the image **can** be used
to create a `VkImageView` suitable for occupying a
`VkDescriptorSet` slot either of type
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType), and be sampled by a
shader.

* 
[VK_IMAGE_USAGE_STORAGE_BIT](#VkImageUsageFlagBits) specifies that the image **can** be used
to create a `VkImageView` suitable for occupying a
`VkDescriptorSet` slot of type
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType).

* 
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits) specifies that the image **can**
be used to create a `VkImageView` suitable for use as a color or
resolve attachment in a `VkFramebuffer`.

* 
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits) specifies that the
image **can** be used to create a `VkImageView` suitable for use as a
depth/stencil
or depth/stencil resolve
attachment in a `VkFramebuffer`.

* 
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits) specifies that
implementations **may** support using [memory allocations](memory.html#memory) with
the [VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](memory.html#VkMemoryPropertyFlagBits) to back an image with
this usage.
This bit **can** be set for any image that **can** be used to create a
`VkImageView` suitable for use as a color, resolve, depth/stencil,
or input attachment.

* 
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits) specifies that the image **can**
be used to create a `VkImageView` suitable for occupying
`VkDescriptorSet` slot of type
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptorsets.html#VkDescriptorType); be read from a shader as an
input attachment; and be used as an input attachment in a framebuffer.

* 
[VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkImageUsageFlagBits) specifies that the
image **can** be used to create a `VkImageView` suitable for use as a
[fragment density map image](fragmentdensitymapops.html#fragmentdensitymapops).

* 
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkImageUsageFlagBits) specifies
    that the image **can** be used to create a `VkImageView` suitable for
    use as a
    [fragment shading rate    attachment](primsrast.html#primsrast-fragment-shading-rate-attachment)
or
    [shading rate image](primsrast.html#primsrast-shading-rate-image)

* 
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](#VkImageUsageFlagBits) specifies that the image
**can** be used as a [decode output picture](videocoding.html#decode-output-picture) in a
[video decode operation](videocoding.html#video-decode-operations).

* 
[VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](#VkImageUsageFlagBits) is reserved for future
use.

* 
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](#VkImageUsageFlagBits) specifies that the image
**can** be used as an output [reconstructed    picture](videocoding.html#reconstructed-picture) or an input [reference picture](videocoding.html#reference-picture) in a
[video decode operation](videocoding.html#video-decode-operations).

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](#VkImageUsageFlagBits) is reserved for future
use.

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](#VkImageUsageFlagBits) specifies that the image
**can** be used as an [encode input picture](videocoding.html#encode-input-picture) in a
[video encode operation](videocoding.html#video-encode-operations).

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](#VkImageUsageFlagBits) specifies that the image
**can** be used as an output [reconstructed    picture](videocoding.html#reconstructed-picture) or an input [reference picture](videocoding.html#reference-picture) in a
[video encode operation](videocoding.html#video-encode-operations).

* 
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkImageUsageFlagBits) specifies that the
image **can** be used as a color or depth/stencil attachment with
[feedback loop enabled](renderpass.html#renderpass-feedbackloop).

* 
[VK_IMAGE_USAGE_TILE_MEMORY_BIT_QCOM](#VkImageUsageFlagBits) specifies that the image **can**
be bound to `VkDeviceMemory` allocated from a [VkMemoryHeap](memory.html#VkMemoryHeap)
with the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property.

* 
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT](#VkImageUsageFlagBits) specifies that the image **can** be
used with host copy commands and host layout transitions.

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits)
specifies that the image **can** be used as a
[quantization delta map](videocoding.html#encode-quantization-delta-map) in a
[video encode operation](videocoding.html#video-encode-operations).

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits) specifies that
the image **can** be used as an [emphasis map](videocoding.html#encode-emphasis-map) in a
[video encode operation](videocoding.html#video-encode-operations).

* 
[VK_IMAGE_USAGE_HOST_TRANSFER_BIT_EXT](#VkImageUsageFlagBits) specifies that the image **can**
be used with host copy commands and host layout transitions.

* 
[VK_IMAGE_USAGE_TENSOR_ALIASING_BIT_ARM](#VkImageUsageFlagBits) specifies that the image
**can** be transitioned to the [VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](#VkImageLayout)
layout.
See [Memory Aliasing](#resources-memory-aliasing) for a complete set of rules for
tensor/image aliasing.

// Provided by VK_VERSION_1_0
typedef VkFlags VkImageUsageFlags;

`VkImageUsageFlags` is a bitmask type for setting a mask of zero or more
[VkImageUsageFlagBits](#VkImageUsageFlagBits).

Bits which **can** be set in [VkImageCreateInfo](#VkImageCreateInfo)::`flags`, specifying
additional parameters of an image, are:

// Provided by VK_VERSION_1_0
typedef enum VkImageCreateFlagBits {
    VK_IMAGE_CREATE_SPARSE_BINDING_BIT = 0x00000001,
    VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT = 0x00000002,
    VK_IMAGE_CREATE_SPARSE_ALIASED_BIT = 0x00000004,
    VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT = 0x00000008,
    VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT = 0x00000010,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_ALIAS_BIT = 0x00000400,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT = 0x00000040,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT = 0x00000020,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT = 0x00000080,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_EXTENDED_USAGE_BIT = 0x00000100,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_PROTECTED_BIT = 0x00000800,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_CREATE_DISJOINT_BIT = 0x00000200,
  // Provided by VK_NV_corner_sampled_image
    VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV = 0x00002000,
  // Provided by VK_EXT_descriptor_heap
    VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT = 0x00010000,
  // Provided by VK_EXT_sample_locations
    VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT = 0x00001000,
  // Provided by VK_EXT_fragment_density_map
    VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT = 0x00004000,
  // Provided by VK_EXT_multisampled_render_to_single_sampled
    VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT = 0x00040000,
  // Provided by VK_EXT_image_2d_view_of_3d
    VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT = 0x00020000,
  // Provided by VK_KHR_video_maintenance1
    VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR = 0x00100000,
  // Provided by VK_EXT_fragment_density_map_offset
    VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT = 0x00008000,
  // Provided by VK_KHR_bind_memory2 with VK_KHR_device_group
    VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT_KHR = VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT,
  // Provided by VK_KHR_maintenance1
    VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT_KHR = VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT,
  // Provided by VK_KHR_maintenance2
    VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT_KHR = VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT,
  // Provided by VK_KHR_maintenance2
    VK_IMAGE_CREATE_EXTENDED_USAGE_BIT_KHR = VK_IMAGE_CREATE_EXTENDED_USAGE_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_IMAGE_CREATE_DISJOINT_BIT_KHR = VK_IMAGE_CREATE_DISJOINT_BIT,
  // Provided by VK_KHR_bind_memory2
    VK_IMAGE_CREATE_ALIAS_BIT_KHR = VK_IMAGE_CREATE_ALIAS_BIT,
  // Provided by VK_EXT_descriptor_buffer
    VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT = VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT,
  // Provided by VK_QCOM_fragment_density_map_offset
    VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_QCOM = VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT,
} VkImageCreateFlagBits;

* 
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits) specifies that the image will
be backed using sparse memory binding.

* 
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits) specifies that the image **can**
be partially backed using sparse memory binding.
Images created with this flag **must** also be created with the
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits) flag.

* 
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](#VkImageCreateFlagBits) specifies that the image will
be backed using sparse memory binding with memory ranges that might also
simultaneously be backing another image (or another portion of the same
image).
Images created with this flag **must** also be created with the
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits) flag.

* 
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits) specifies that the image **can**
be used to create a `VkImageView` with a different format from the
image.
For [multi-planar formats](formats.html#formats-multiplanar),
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits) specifies that a
`VkImageView` can be created of a *plane* of the image.

* 
[VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](#VkImageCreateFlagBits) specifies that the image **can**
be used to create a `VkImageView` of type
[VK_IMAGE_VIEW_TYPE_CUBE](#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](#VkImageViewType).

* 
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits) specifies that the image
**can** be used to create a `VkImageView` of type
[VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType).

* 
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](#VkImageCreateFlagBits) specifies that the
image **can** be used to create a `VkImageView` of type
[VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType).

* 
[VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits) specifies that the image is a
protected image.

* 
[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](#VkImageCreateFlagBits) specifies that the
image **can** be used with a non-zero value of the
`splitInstanceBindRegionCount` member of a
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo) structure passed into
[vkBindImageMemory2](#vkBindImageMemory2).
This flag also has the effect of making the image use the standard
sparse image block dimensions.

* 
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#VkImageCreateFlagBits) specifies that the
image having a compressed format **can** be used to create a
`VkImageView` with an uncompressed format where each texel in the
image view corresponds to a compressed texel block of the image.

* 
[VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](#VkImageCreateFlagBits) specifies that the image **can**
be created with usage flags that are not supported for the format the
image is created with but are supported for at least one format a
`VkImageView` created from the image **can** have.

* 
[VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) specifies that an image with a
[multi-planar format](formats.html#formats-multiplanar) **must** have each plane
separately bound to memory, rather than having a single memory binding
for the whole image; the presence of this bit distinguishes a *disjoint
image* from an image without this bit set.

* 
[VK_IMAGE_CREATE_ALIAS_BIT](#VkImageCreateFlagBits) specifies that two images created with
    the same creation parameters and aliased to the same memory **can**
    interpret the contents of the memory consistently with each other,
    subject to the rules described in the [Memory    Aliasing](#resources-memory-aliasing) section.
    This flag further specifies that each plane of a *disjoint* image **can**
    share an in-memory non-linear representation with single-plane images,
    and that a single-plane image **can** share an in-memory non-linear
    representation with a plane of a multi-planar disjoint image, according
    to the rules in [Compatible Formats of Planes of Multi-Planar Formats](formats.html#formats-compatible-planes).
    If the `pNext` chain includes a
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)
or
[VkExternalMemoryImageCreateInfoNV](#VkExternalMemoryImageCreateInfoNV)
    structure whose `handleTypes` member is not `0`, it is as if
    [VK_IMAGE_CREATE_ALIAS_BIT](#VkImageCreateFlagBits) is set.

* 
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](#VkImageCreateFlagBits)
specifies that an image with a depth or depth/stencil format **can** be
used with custom sample locations when used as a depth/stencil
attachment.

* 
[VK_IMAGE_CREATE_CORNER_SAMPLED_BIT_NV](#VkImageCreateFlagBits) specifies that the image is
a [corner-sampled image](#resources-images-corner-sampled).

* 
[VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](#VkImageCreateFlagBits) specifies that an image **can** be
in a subsampled format which **may** be more optimal when written as an
attachment by a render pass that has a fragment density map attachment.
Accessing a subsampled image has additional considerations:

Image data read as an image sampler will have **undefined** values if the
sampler was not created with `flags` containing
[VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) or was not sampled through
a combined [embedded sampler and     image mapping](descriptorheaps.html#VkDescriptorSetAndBindingMappingEXT) if using descriptor heaps, or
the use of a combined image sampler with an immutable sampler in
`VkDescriptorSetLayoutBinding`.

* 
Image data read with an input attachment will have **undefined** values if
the contents were not written as an attachment in an earlier subpass of
the same render pass.

* 
Image data read as an image sampler in the fragment shader will be
additionally be read by the device during
[VK_PIPELINE_STAGE_VERTEX_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits) if
[     `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT`::`subsampledCoarseReconstructionEarlyAccess`](limits.html#limits-subsampledCoarseReconstructionEarlyAccess)
is [VK_TRUE](fundamentals.html#VK_TRUE) and the sampler was created with `flags`
containing
[VK_SAMPLER_CREATE_SUBSAMPLED_COARSE_RECONSTRUCTION_BIT_EXT](samplers.html#VkSamplerCreateFlagBits).

* 
Image data read with load operations are resampled to the fragment
density of the render pass if [     `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT`::`subsampledLoads`](limits.html#limits-subsampledLoads)
is [VK_TRUE](fundamentals.html#VK_TRUE).
Otherwise, values of image data are **undefined**.

* 
Image contents outside of the render area take on **undefined** values if
the image is stored as a render pass attachment.

[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](#VkImageCreateFlagBits) specifies that
an image **can** be used in a render pass with non-zero
[fragment density map offsets](renderpass.html#renderpass-fragmentdensitymapoffsets).
In a render pass with non-zero offsets, fragment density map
attachments, input attachments, color attachments, depth/stencil
attachment, resolve attachments, and preserve attachments **must** be
created with [VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](#VkImageCreateFlagBits).

[VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits) specifies
that the image **can** be used with descriptor buffers when capturing and
replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) for more detail.

[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](#VkImageCreateFlagBits)
specifies that an image **can** be used with
[multisampled rendering as a    single-sampled framebuffer attachment](renderpass.html#multisampled-render-to-single-sampled)

[VK_IMAGE_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](#VkImageCreateFlagBits) specifies that
the image **can** be used in [video coding operations](videocoding.html#video-coding)
without having to specify at image creation time the set of video
profiles the image will be used with, except for images used only as
[DPB](videocoding.html#dpb) pictures, as long as the image is otherwise
[compatible](videocoding.html#video-profile-compatibility) with the video profile in
question.

|  | This enables exchanging video picture data without additional copies or
| --- | --- |
conversions when used as:

* 
[Decode output pictures](videocoding.html#decode-output-picture), regardless of the
video profile used to produce them.

* 
[Encode input pictures](videocoding.html#encode-input-picture), regardless of the video
profile used to consume them.

This includes images created with both
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](#VkImageUsageFlagBits) and
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](#VkImageUsageFlagBits), which is necessary to use the
same video picture as the [reconstructed picture](videocoding.html#reconstructed-picture)
and [decode output picture](videocoding.html#decode-output-picture) in a video decode
operation on implementations supporting
[VK_VIDEO_DECODE_CAPABILITY_DPB_AND_OUTPUT_COINCIDE_BIT_KHR](videocoding.html#VkVideoDecodeCapabilityFlagBitsKHR).

However, images with only DPB usage remain tied to the video profiles the
image was created with, as the data layout of such DPB-only images **may** be
implementation- and codec-dependent.

If an application would like to share or reuse the device memory backing
such images (e.g. for the purposes of temporal aliasing), then it **should**
create separate image objects for each video profile and bind them to the
same underlying device memory range, similar to how memory resources **can** be
shared across separate video sessions or any other memory-backed resource. |

See [Sparse Resource Features](sparsemem.html#sparsememory-sparseresourcefeatures) and
[Sparse Physical Device Features](sparsemem.html#sparsememory-physicalfeatures) for more
details.

// Provided by VK_VERSION_1_0
typedef VkFlags VkImageCreateFlags;

`VkImageCreateFlags` is a bitmask type for setting a mask of zero or
more [VkImageCreateFlagBits](#VkImageCreateFlagBits).

Possible values of [VkImageCreateInfo](#VkImageCreateInfo)::`imageType`, specifying the
basic dimensionality of an image, are:

// Provided by VK_VERSION_1_0
typedef enum VkImageType {
    VK_IMAGE_TYPE_1D = 0,
    VK_IMAGE_TYPE_2D = 1,
    VK_IMAGE_TYPE_3D = 2,
} VkImageType;

* 
[VK_IMAGE_TYPE_1D](#VkImageType) specifies a one-dimensional image.

* 
[VK_IMAGE_TYPE_2D](#VkImageType) specifies a two-dimensional image.

* 
[VK_IMAGE_TYPE_3D](#VkImageType) specifies a three-dimensional image.

Possible values of [VkImageCreateInfo](#VkImageCreateInfo)::`tiling`, specifying the
tiling arrangement of texel blocks in an image, are:

// Provided by VK_VERSION_1_0
typedef enum VkImageTiling {
    VK_IMAGE_TILING_OPTIMAL = 0,
    VK_IMAGE_TILING_LINEAR = 1,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT = 1000158000,
} VkImageTiling;

* 
[VK_IMAGE_TILING_OPTIMAL](#VkImageTiling) specifies optimal tiling (texels are laid
out in an implementation-dependent arrangement, for more efficient
memory access).

* 
[VK_IMAGE_TILING_LINEAR](#VkImageTiling) specifies linear tiling (texels are laid
out in memory in row-major order, possibly with some padding on each
row).

* 
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling) specifies that the image’s
tiling is defined by a [Linux DRM format    modifier](../appendices/glossary.html#glossary-drm-format-modifier).
The modifier is specified at image creation with
[VkImageDrmFormatModifierListCreateInfoEXT](#VkImageDrmFormatModifierListCreateInfoEXT) or
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT), and **can** be queried
with [vkGetImageDrmFormatModifierPropertiesEXT](#vkGetImageDrmFormatModifierPropertiesEXT).

To query the memory layout of an image subresource, call:

// Provided by VK_VERSION_1_0
void vkGetImageSubresourceLayout(
    VkDevice                                    device,
    VkImage                                     image,
    const VkImageSubresource*                   pSubresource,
    VkSubresourceLayout*                        pLayout);

* 
`device` is the logical device that owns the image.

* 
`image` is the image whose layout is being queried.

* 
`pSubresource` is a pointer to a [VkImageSubresource](#VkImageSubresource) structure
selecting a specific image subresource from the image.

* 
`pLayout` is a pointer to a [VkSubresourceLayout](#VkSubresourceLayout) structure in
which the layout is returned.

If the image is [linear](../appendices/glossary.html#glossary-linear-resource), then the
returned layout is valid for [host access](memory.html#memory-device-hostaccess).

If the image’s
tiling is [VK_IMAGE_TILING_LINEAR](#VkImageTiling) and its
format is a [multi-planar format](formats.html#formats-multiplanar), then
`vkGetImageSubresourceLayout` describes one
*format plane*
of the image.
If the image’s tiling is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then
`vkGetImageSubresourceLayout` describes one *memory plane* of the image.
If the image’s tiling is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling) and
the image is [non-linear](../appendices/glossary.html#glossary-linear-resource), then the returned
layout has an implementation-dependent meaning; the vendor of the image’s
[DRM format modifier](../appendices/glossary.html#glossary-drm-format-modifier) **may** provide
documentation that explains how to interpret the returned layout.

`vkGetImageSubresourceLayout` is invariant for the lifetime of a single
image.
However, the subresource layout of images in Android hardware buffer or QNX
Screen buffer external memory is not known until the image has been bound to
memory, so applications **must** not call [vkGetImageSubresourceLayout](#vkGetImageSubresourceLayout) for
such an image before it has been bound.

Valid Usage

* 
[](#VUID-vkGetImageSubresourceLayout-image-07790) VUID-vkGetImageSubresourceLayout-image-07790

`image` **must** have been created with `tiling` equal to
[VK_IMAGE_TILING_LINEAR](#VkImageTiling) or
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling)

* 
[](#VUID-vkGetImageSubresourceLayout-aspectMask-00997) VUID-vkGetImageSubresourceLayout-aspectMask-00997

The `aspectMask` member of `pSubresource` **must** only have a
single bit set

* 
[](#VUID-vkGetImageSubresourceLayout-mipLevel-01716) VUID-vkGetImageSubresourceLayout-mipLevel-01716

The `mipLevel` member of `pSubresource` **must** be less than the
`mipLevels` specified in `image`

* 
[](#VUID-vkGetImageSubresourceLayout-arrayLayer-01717) VUID-vkGetImageSubresourceLayout-arrayLayer-01717

The `arrayLayer` member of `pSubresource` **must** be less than the
`arrayLayers` specified in `image`

* 
[](#VUID-vkGetImageSubresourceLayout-format-08886) VUID-vkGetImageSubresourceLayout-format-08886

If `format` of the `image` is a color format
that is not a [multi-planar format](formats.html#formats-multiplanar),
and `tiling` of the `image` is
[VK_IMAGE_TILING_LINEAR](#VkImageTiling) or [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling), the
`aspectMask` member of `pSubresource` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-vkGetImageSubresourceLayout-format-04462) VUID-vkGetImageSubresourceLayout-format-04462

If `format` of the `image` has a depth component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-vkGetImageSubresourceLayout-format-04463) VUID-vkGetImageSubresourceLayout-format-04463

If `format` of the `image` has a stencil component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-vkGetImageSubresourceLayout-format-04464) VUID-vkGetImageSubresourceLayout-format-04464

If `format` of the `image` does not contain a stencil or
depth component, the `aspectMask` member of `pSubresource` **must**
not contain [VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-vkGetImageSubresourceLayout-tiling-08717) VUID-vkGetImageSubresourceLayout-tiling-08717

If the `tiling` of the `image` is
[VK_IMAGE_TILING_LINEAR](#VkImageTiling) and has a [    multi-planar format](formats.html#formats-multiplanar), then the `aspectMask` member of
`pSubresource` **must** be a single valid
[multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-vkGetImageSubresourceLayout-image-09432) VUID-vkGetImageSubresourceLayout-image-09432

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
external memory handle type, then `image` **must** be bound to memory

* 
[](#VUID-vkGetImageSubresourceLayout-tiling-09433) VUID-vkGetImageSubresourceLayout-tiling-09433

If the `tiling` of the `image` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then the `aspectMask`
member of `pSubresource` **must** be
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` and the index *i* **must**
be less than the
[VkDrmFormatModifierPropertiesEXT](formats.html#VkDrmFormatModifierPropertiesEXT)::`drmFormatModifierPlaneCount`
associated with the image’s `format` and
[VkImageDrmFormatModifierPropertiesEXT](#VkImageDrmFormatModifierPropertiesEXT)::`drmFormatModifier`

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageSubresourceLayout-device-parameter) VUID-vkGetImageSubresourceLayout-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageSubresourceLayout-image-parameter) VUID-vkGetImageSubresourceLayout-image-parameter

 `image` **must** be a valid [VkImage](#VkImage) handle

* 
[](#VUID-vkGetImageSubresourceLayout-pSubresource-parameter) VUID-vkGetImageSubresourceLayout-pSubresource-parameter

 `pSubresource` **must** be a valid pointer to a valid [VkImageSubresource](#VkImageSubresource) structure

* 
[](#VUID-vkGetImageSubresourceLayout-pLayout-parameter) VUID-vkGetImageSubresourceLayout-pLayout-parameter

 `pLayout` **must** be a valid pointer to a [VkSubresourceLayout](#VkSubresourceLayout) structure

* 
[](#VUID-vkGetImageSubresourceLayout-image-parent) VUID-vkGetImageSubresourceLayout-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

The `VkImageSubresource` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageSubresource {
    VkImageAspectFlags    aspectMask;
    uint32_t              mipLevel;
    uint32_t              arrayLayer;
} VkImageSubresource;

* 
`aspectMask` is a [VkImageAspectFlags](#VkImageAspectFlags) value selecting the image
*aspect*.

* 
`mipLevel` selects the mipmap level.

* 
`arrayLayer` selects the array layer.

Valid Usage (Implicit)

* 
[](#VUID-VkImageSubresource-aspectMask-parameter) VUID-VkImageSubresource-aspectMask-parameter

 `aspectMask` **must** be a valid combination of [VkImageAspectFlagBits](#VkImageAspectFlagBits) values

* 
[](#VUID-VkImageSubresource-aspectMask-requiredbitmask) VUID-VkImageSubresource-aspectMask-requiredbitmask

 `aspectMask` **must** not be `0`

Information about the layout of the image subresource is returned in a
`VkSubresourceLayout` structure:

// Provided by VK_VERSION_1_0
typedef struct VkSubresourceLayout {
    VkDeviceSize    offset;
    VkDeviceSize    size;
    VkDeviceSize    rowPitch;
    VkDeviceSize    arrayPitch;
    VkDeviceSize    depthPitch;
} VkSubresourceLayout;

* 
`offset` is the byte offset from the start of the image
or the plane
where the image subresource begins.

* 
`size` is the size in bytes of the image subresource.
`size` includes any extra memory that is required based on
`rowPitch`.

* 
`rowPitch` describes the number of bytes between each row of texels
in an image.

* 
`arrayPitch` describes the number of bytes between each array layer
of an image.

* 
`depthPitch` describes the number of bytes between each slice of 3D
image.

If the image is [linear](../appendices/glossary.html#glossary-linear-resource), then `rowPitch`,
`arrayPitch` and `depthPitch` describe the layout of the image
subresource in linear memory.
For uncompressed formats, `rowPitch` is the number of bytes between
texels with the same x coordinate in adjacent rows (y coordinates differ by
one).
`arrayPitch` is the number of bytes between texels with the same x and y
coordinate in adjacent array layers of the image (array layer values differ
by one).
`depthPitch` is the number of bytes between texels with the same x and y
coordinate in adjacent slices of a 3D image (z coordinates differ by one).
Expressed as an addressing formula, the starting byte of a texel in the
image subresource has address:

// (x,y,z,layer) are in texel coordinates
address(x,y,z,layer) = layer*arrayPitch + z*depthPitch + y*rowPitch + x*elementSize + offset

For compressed formats, the `rowPitch` is the number of bytes between
compressed texel blocks in adjacent rows.
`arrayPitch` is the number of bytes between compressed texel blocks in
adjacent array layers.
`depthPitch` is the number of bytes between compressed texel blocks in
adjacent slices of a 3D image.

// (x,y,z,layer) are in compressed texel block coordinates
address(x,y,z,layer) = layer*arrayPitch + z*depthPitch + y*rowPitch + x*compressedTexelBlockByteSize + offset;

The value of `arrayPitch` is **undefined** for images that were not created
as arrays.
`depthPitch` is defined only for 3D images.

If the image has a
*single-plane*
color format
and its tiling is [VK_IMAGE_TILING_LINEAR](#VkImageTiling)
, then the `aspectMask` member of `VkImageSubresource` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits).

If the image has a depth/stencil format
and its tiling is [VK_IMAGE_TILING_LINEAR](#VkImageTiling)
, then `aspectMask` **must** be either [VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits).
On implementations that store depth and stencil aspects separately, querying
each of these image subresource layouts will return a different `offset`
and `size` representing the region of memory used for that aspect.
On implementations that store depth and stencil aspects interleaved, the
same `offset` and `size` are returned and represent the interleaved
memory allocation.

If the image has a [multi-planar format](formats.html#formats-multiplanar)
and its tiling is [VK_IMAGE_TILING_LINEAR](#VkImageTiling)
, then the `aspectMask` member of `VkImageSubresource` **must** be
[VK_IMAGE_ASPECT_PLANE_0_BIT](#VkImageAspectFlagBits), [VK_IMAGE_ASPECT_PLANE_1_BIT](#VkImageAspectFlagBits), or
(for 3-plane formats only) [VK_IMAGE_ASPECT_PLANE_2_BIT](#VkImageAspectFlagBits).
Querying each of these image subresource layouts will return a different
`offset` and `size` representing the region of memory used for that
plane.
If the image is *disjoint*, then the `offset` is relative to the base
address of the plane.
If the image is *non-disjoint*, then the `offset` is relative to the
base address of the image.

If the image’s tiling is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then
the `aspectMask` member of `VkImageSubresource` **must** be one of
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT`, where the maximum allowed
plane index *i* is defined by the
[VkDrmFormatModifierPropertiesEXT](formats.html#VkDrmFormatModifierPropertiesEXT)::`drmFormatModifierPlaneCount`
associated with the image’s [VkImageCreateInfo](#VkImageCreateInfo)::`format` and
[modifier](../appendices/glossary.html#glossary-drm-format-modifier).
The memory range used by the subresource is described by `offset` and
`size`.
If the image is *disjoint*, then the `offset` is relative to the base
address of the *memory plane*.
If the image is *non-disjoint*, then the `offset` is relative to the
base address of the image.
If the image is [non-linear](../appendices/glossary.html#glossary-linear-resource), then
`rowPitch`, `arrayPitch`, and `depthPitch` have an
implementation-dependent meaning.

To query the memory layout of an image subresource, call:

// Provided by VK_VERSION_1_4
void vkGetImageSubresourceLayout2(
    VkDevice                                    device,
    VkImage                                     image,
    const VkImageSubresource2*                  pSubresource,
    VkSubresourceLayout2*                       pLayout);

// Provided by VK_KHR_maintenance5
// Equivalent to vkGetImageSubresourceLayout2
void vkGetImageSubresourceLayout2KHR(
    VkDevice                                    device,
    VkImage                                     image,
    const VkImageSubresource2*                  pSubresource,
    VkSubresourceLayout2*                       pLayout);

// Provided by VK_EXT_host_image_copy, VK_EXT_image_compression_control
// Equivalent to vkGetImageSubresourceLayout2
void vkGetImageSubresourceLayout2EXT(
    VkDevice                                    device,
    VkImage                                     image,
    const VkImageSubresource2*                  pSubresource,
    VkSubresourceLayout2*                       pLayout);

* 
`device` is the logical device that owns the image.

* 
`image` is the image whose layout is being queried.

* 
`pSubresource` is a pointer to a [VkImageSubresource2](#VkImageSubresource2) structure
selecting a specific image for the image subresource.

* 
`pLayout` is a pointer to a [VkSubresourceLayout2](#VkSubresourceLayout2) structure in
which the layout is returned.

`vkGetImageSubresourceLayout2` behaves similarly to
[vkGetImageSubresourceLayout](#vkGetImageSubresourceLayout), with the ability to specify extended
inputs via chained input structures, and to return extended information via
chained output structures.

It is legal to call `vkGetImageSubresourceLayout2` with an `image`
created with `tiling` equal to [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling), but the
members of [VkSubresourceLayout2](#VkSubresourceLayout2)::`subresourceLayout` will have
**undefined** values in this case.

|  | Structures chained from [VkImageSubresource2](#VkImageSubresource2)::`pNext` will also be
| --- | --- |
updated when `tiling` is equal to [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling). |

Valid Usage

* 
[](#VUID-vkGetImageSubresourceLayout2-aspectMask-00997) VUID-vkGetImageSubresourceLayout2-aspectMask-00997

The `aspectMask` member of `pSubresource` **must** only have a
single bit set

* 
[](#VUID-vkGetImageSubresourceLayout2-mipLevel-01716) VUID-vkGetImageSubresourceLayout2-mipLevel-01716

The `mipLevel` member of `pSubresource` **must** be less than the
`mipLevels` specified in `image`

* 
[](#VUID-vkGetImageSubresourceLayout2-arrayLayer-01717) VUID-vkGetImageSubresourceLayout2-arrayLayer-01717

The `arrayLayer` member of `pSubresource` **must** be less than the
`arrayLayers` specified in `image`

* 
[](#VUID-vkGetImageSubresourceLayout2-format-08886) VUID-vkGetImageSubresourceLayout2-format-08886

If `format` of the `image` is a color format
that is not a [multi-planar format](formats.html#formats-multiplanar),
and `tiling` of the `image` is
[VK_IMAGE_TILING_LINEAR](#VkImageTiling) or [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling), the
`aspectMask` member of `pSubresource` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-vkGetImageSubresourceLayout2-format-04462) VUID-vkGetImageSubresourceLayout2-format-04462

If `format` of the `image` has a depth component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-vkGetImageSubresourceLayout2-format-04463) VUID-vkGetImageSubresourceLayout2-format-04463

If `format` of the `image` has a stencil component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-vkGetImageSubresourceLayout2-format-04464) VUID-vkGetImageSubresourceLayout2-format-04464

If `format` of the `image` does not contain a stencil or
depth component, the `aspectMask` member of `pSubresource` **must**
not contain [VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-vkGetImageSubresourceLayout2-tiling-08717) VUID-vkGetImageSubresourceLayout2-tiling-08717

If the `tiling` of the `image` is
[VK_IMAGE_TILING_LINEAR](#VkImageTiling) and has a [    multi-planar format](formats.html#formats-multiplanar), then the `aspectMask` member of
`pSubresource` **must** be a single valid
[multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-vkGetImageSubresourceLayout2-image-09434) VUID-vkGetImageSubresourceLayout2-image-09434

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
external memory handle type, then `image` **must** be bound to memory

* 
[](#VUID-vkGetImageSubresourceLayout2-tiling-09435) VUID-vkGetImageSubresourceLayout2-tiling-09435

If the `tiling` of the `image` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then the `aspectMask`
member of `pSubresource` **must** be
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` and the index *i* **must**
be less than the
[VkDrmFormatModifierPropertiesEXT](formats.html#VkDrmFormatModifierPropertiesEXT)::`drmFormatModifierPlaneCount`
associated with the image’s `format` and
[VkImageDrmFormatModifierPropertiesEXT](#VkImageDrmFormatModifierPropertiesEXT)::`drmFormatModifier`

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageSubresourceLayout2-device-parameter) VUID-vkGetImageSubresourceLayout2-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageSubresourceLayout2-image-parameter) VUID-vkGetImageSubresourceLayout2-image-parameter

 `image` **must** be a valid [VkImage](#VkImage) handle

* 
[](#VUID-vkGetImageSubresourceLayout2-pSubresource-parameter) VUID-vkGetImageSubresourceLayout2-pSubresource-parameter

 `pSubresource` **must** be a valid pointer to a valid [VkImageSubresource2](#VkImageSubresource2) structure

* 
[](#VUID-vkGetImageSubresourceLayout2-pLayout-parameter) VUID-vkGetImageSubresourceLayout2-pLayout-parameter

 `pLayout` **must** be a valid pointer to a [VkSubresourceLayout2](#VkSubresourceLayout2) structure

* 
[](#VUID-vkGetImageSubresourceLayout2-image-parent) VUID-vkGetImageSubresourceLayout2-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

The `VkImageSubresource2` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkImageSubresource2 {
    VkStructureType       sType;
    void*                 pNext;
    VkImageSubresource    imageSubresource;
} VkImageSubresource2;

// Provided by VK_KHR_maintenance5
// Equivalent to VkImageSubresource2
typedef VkImageSubresource2 VkImageSubresource2KHR;

// Provided by VK_EXT_host_image_copy, VK_EXT_image_compression_control
// Equivalent to VkImageSubresource2
typedef VkImageSubresource2 VkImageSubresource2EXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageSubresource` is a [VkImageSubresource](#VkImageSubresource) structure.

Valid Usage (Implicit)

* 
[](#VUID-VkImageSubresource2-sType-sType) VUID-VkImageSubresource2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageSubresource2-pNext-pNext) VUID-VkImageSubresource2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageSubresource2-imageSubresource-parameter) VUID-VkImageSubresource2-imageSubresource-parameter

 `imageSubresource` **must** be a valid [VkImageSubresource](#VkImageSubresource) structure

Information about the layout of the image subresource is returned in a
`VkSubresourceLayout2` structure:

// Provided by VK_VERSION_1_4
typedef struct VkSubresourceLayout2 {
    VkStructureType        sType;
    void*                  pNext;
    VkSubresourceLayout    subresourceLayout;
} VkSubresourceLayout2;

// Provided by VK_KHR_maintenance5
// Equivalent to VkSubresourceLayout2
typedef VkSubresourceLayout2 VkSubresourceLayout2KHR;

// Provided by VK_EXT_host_image_copy, VK_EXT_image_compression_control
// Equivalent to VkSubresourceLayout2
typedef VkSubresourceLayout2 VkSubresourceLayout2EXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`subresourceLayout` is a [VkSubresourceLayout](#VkSubresourceLayout) structure.

Valid Usage (Implicit)

* 
[](#VUID-VkSubresourceLayout2-sType-sType) VUID-VkSubresourceLayout2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSubresourceLayout2-pNext-pNext) VUID-VkSubresourceLayout2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkImageCompressionPropertiesEXT](#VkImageCompressionPropertiesEXT) or [VkSubresourceHostMemcpySize](#VkSubresourceHostMemcpySize)

* 
[](#VUID-VkSubresourceLayout2-sType-unique) VUID-VkSubresourceLayout2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

To query the memory size needed to copy to or from an image using
[vkCopyMemoryToImage](copies.html#vkCopyMemoryToImage) or [vkCopyImageToMemory](copies.html#vkCopyImageToMemory) when the
[VK_HOST_IMAGE_COPY_MEMCPY_BIT](copies.html#VkHostImageCopyFlagBitsEXT) flag is specified, add a
[VkSubresourceHostMemcpySize](#VkSubresourceHostMemcpySize) structure to the `pNext` chain of the
[VkSubresourceLayout2](#VkSubresourceLayout2) structure in a call to
[vkGetImageSubresourceLayout2](#vkGetImageSubresourceLayout2).

The `VkSubresourceHostMemcpySize` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkSubresourceHostMemcpySize {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       size;
} VkSubresourceHostMemcpySize;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkSubresourceHostMemcpySize
typedef VkSubresourceHostMemcpySize VkSubresourceHostMemcpySizeEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`size` is the size in bytes of the image subresource.

Valid Usage (Implicit)

* 
[](#VUID-VkSubresourceHostMemcpySize-sType-sType) VUID-VkSubresourceHostMemcpySize-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBRESOURCE_HOST_MEMCPY_SIZE](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubresourceLayout2](#VkSubresourceLayout2)

To query the memory layout of an image subresource, without an image object,
call:

// Provided by VK_VERSION_1_4
void vkGetDeviceImageSubresourceLayout(
    VkDevice                                    device,
    const VkDeviceImageSubresourceInfo*         pInfo,
    VkSubresourceLayout2*                       pLayout);

// Provided by VK_KHR_maintenance5
// Equivalent to vkGetDeviceImageSubresourceLayout
void vkGetDeviceImageSubresourceLayoutKHR(
    VkDevice                                    device,
    const VkDeviceImageSubresourceInfo*         pInfo,
    VkSubresourceLayout2*                       pLayout);

* 
`device` is the logical device that owns the image.

* 
`pInfo` is a pointer to a [VkDeviceImageSubresourceInfo](#VkDeviceImageSubresourceInfo)
structure containing parameters required for the subresource layout
query.

* 
`pLayout` is a pointer to a [VkSubresourceLayout2](#VkSubresourceLayout2) structure in
which the layout is returned.

`vkGetDeviceImageSubresourceLayout` behaves similarly to
[vkGetImageSubresourceLayout2](#vkGetImageSubresourceLayout2), but uses a [VkImageCreateInfo](#VkImageCreateInfo)
structure to specify the image rather than a [VkImage](#VkImage) object.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceImageSubresourceLayout-device-parameter) VUID-vkGetDeviceImageSubresourceLayout-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceImageSubresourceLayout-pInfo-parameter) VUID-vkGetDeviceImageSubresourceLayout-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceImageSubresourceInfo](#VkDeviceImageSubresourceInfo) structure

* 
[](#VUID-vkGetDeviceImageSubresourceLayout-pLayout-parameter) VUID-vkGetDeviceImageSubresourceLayout-pLayout-parameter

 `pLayout` **must** be a valid pointer to a [VkSubresourceLayout2](#VkSubresourceLayout2) structure

The `VkDeviceImageSubresourceInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkDeviceImageSubresourceInfo {
    VkStructureType               sType;
    const void*                   pNext;
    const VkImageCreateInfo*      pCreateInfo;
    const VkImageSubresource2*    pSubresource;
} VkDeviceImageSubresourceInfo;

// Provided by VK_KHR_maintenance5
// Equivalent to VkDeviceImageSubresourceInfo
typedef VkDeviceImageSubresourceInfo VkDeviceImageSubresourceInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pCreateInfo` is a pointer to a [VkImageCreateInfo](#VkImageCreateInfo) structure
containing parameters affecting creation of the image to query.

* 
`pSubresource` is a pointer to a [VkImageSubresource2](#VkImageSubresource2) structure
selecting a specific image subresource for the query.

Valid Usage

* 
[](#VUID-VkDeviceImageSubresourceInfo-aspectMask-00997) VUID-VkDeviceImageSubresourceInfo-aspectMask-00997

The `aspectMask` member of `pSubresource` **must** only have a
single bit set

* 
[](#VUID-VkDeviceImageSubresourceInfo-mipLevel-01716) VUID-VkDeviceImageSubresourceInfo-mipLevel-01716

The `mipLevel` member of `pSubresource` **must** be less than the
`mipLevels` specified in `pCreateInfo`

* 
[](#VUID-VkDeviceImageSubresourceInfo-arrayLayer-01717) VUID-VkDeviceImageSubresourceInfo-arrayLayer-01717

The `arrayLayer` member of `pSubresource` **must** be less than the
`arrayLayers` specified in `pCreateInfo`

* 
[](#VUID-VkDeviceImageSubresourceInfo-format-08886) VUID-VkDeviceImageSubresourceInfo-format-08886

If `format` of the `image` is a color format
that is not a [multi-planar format](formats.html#formats-multiplanar),
and `tiling` of the `pCreateInfo` is
[VK_IMAGE_TILING_LINEAR](#VkImageTiling) or [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling), the
`aspectMask` member of `pSubresource` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-VkDeviceImageSubresourceInfo-format-04462) VUID-VkDeviceImageSubresourceInfo-format-04462

If `format` of the `pCreateInfo` has a depth component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-VkDeviceImageSubresourceInfo-format-04463) VUID-VkDeviceImageSubresourceInfo-format-04463

If `format` of the `pCreateInfo` has a stencil component, the
`aspectMask` member of `pSubresource` **must** contain
[VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-VkDeviceImageSubresourceInfo-format-04464) VUID-VkDeviceImageSubresourceInfo-format-04464

If `format` of the `pCreateInfo` does not contain a stencil or
depth component, the `aspectMask` member of `pSubresource` **must**
not contain [VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-VkDeviceImageSubresourceInfo-tiling-08717) VUID-VkDeviceImageSubresourceInfo-tiling-08717

If the `tiling` of the `pCreateInfo` is
[VK_IMAGE_TILING_LINEAR](#VkImageTiling) and has a [    multi-planar format](formats.html#formats-multiplanar), then the `aspectMask` member of
`pSubresource` **must** be a single valid
[multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceImageSubresourceInfo-sType-sType) VUID-VkDeviceImageSubresourceInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_IMAGE_SUBRESOURCE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceImageSubresourceInfo-pNext-pNext) VUID-VkDeviceImageSubresourceInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceImageSubresourceInfo-pCreateInfo-parameter) VUID-VkDeviceImageSubresourceInfo-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkImageCreateInfo](#VkImageCreateInfo) structure

* 
[](#VUID-VkDeviceImageSubresourceInfo-pSubresource-parameter) VUID-VkDeviceImageSubresourceInfo-pSubresource-parameter

 `pSubresource` **must** be a valid pointer to a valid [VkImageSubresource2](#VkImageSubresource2) structure

If an image was created with [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling),
then the image has a [Linux DRM format modifier](../appendices/glossary.html#glossary-drm-format-modifier).
To query the *modifier*, call:

// Provided by VK_EXT_image_drm_format_modifier
VkResult vkGetImageDrmFormatModifierPropertiesEXT(
    VkDevice                                    device,
    VkImage                                     image,
    VkImageDrmFormatModifierPropertiesEXT*      pProperties);

* 
`device` is the logical device that owns the image.

* 
`image` is the queried image.

* 
`pProperties` is a pointer to a
[VkImageDrmFormatModifierPropertiesEXT](#VkImageDrmFormatModifierPropertiesEXT) structure in which
properties of the image’s *DRM format modifier* are returned.

Valid Usage

* 
[](#VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-02272) VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-02272

`image` **must** have been created with [    `tiling`](#VkImageCreateInfo) equal to [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling)

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageDrmFormatModifierPropertiesEXT-device-parameter) VUID-vkGetImageDrmFormatModifierPropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-parameter) VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-parameter

 `image` **must** be a valid [VkImage](#VkImage) handle

* 
[](#VUID-vkGetImageDrmFormatModifierPropertiesEXT-pProperties-parameter) VUID-vkGetImageDrmFormatModifierPropertiesEXT-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkImageDrmFormatModifierPropertiesEXT](#VkImageDrmFormatModifierPropertiesEXT) structure

* 
[](#VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-parent) VUID-vkGetImageDrmFormatModifierPropertiesEXT-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The [VkImageDrmFormatModifierPropertiesEXT](#VkImageDrmFormatModifierPropertiesEXT) structure is defined as:

// Provided by VK_EXT_image_drm_format_modifier
typedef struct VkImageDrmFormatModifierPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           drmFormatModifier;
} VkImageDrmFormatModifierPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`drmFormatModifier` returns the image’s
[Linux DRM format modifier](../appendices/glossary.html#glossary-drm-format-modifier).

If the `image` was created with
[VkImageDrmFormatModifierListCreateInfoEXT](#VkImageDrmFormatModifierListCreateInfoEXT), then the returned
`drmFormatModifier` **must** belong to the list of modifiers provided at
time of image creation in
[VkImageDrmFormatModifierListCreateInfoEXT](#VkImageDrmFormatModifierListCreateInfoEXT)::`pDrmFormatModifiers`.
If the `image` was created with
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT), then the returned
`drmFormatModifier` **must** be the modifier provided at time of image
creation in
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT)::`drmFormatModifier`.

Valid Usage (Implicit)

* 
[](#VUID-VkImageDrmFormatModifierPropertiesEXT-sType-sType) VUID-VkImageDrmFormatModifierPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_DRM_FORMAT_MODIFIER_PROPERTIES_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageDrmFormatModifierPropertiesEXT-pNext-pNext) VUID-VkImageDrmFormatModifierPropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

To destroy an image, call:

// Provided by VK_VERSION_1_0
void vkDestroyImage(
    VkDevice                                    device,
    VkImage                                     image,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the image.

* 
`image` is the image to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyImage-image-01000) VUID-vkDestroyImage-image-01000

All submitted commands that refer to `image`, either directly or via
a `VkImageView`, **must** have completed execution

* 
[](#VUID-vkDestroyImage-image-01001) VUID-vkDestroyImage-image-01001

If `VkAllocationCallbacks` were provided when `image` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyImage-image-01002) VUID-vkDestroyImage-image-01002

If no `VkAllocationCallbacks` were provided when `image` was
created, `pAllocator` **must** be `NULL`

* 
[](#VUID-vkDestroyImage-image-04882) VUID-vkDestroyImage-image-04882

`image` **must** not have been acquired from
[vkGetSwapchainImagesKHR](VK_KHR_surface/wsi.html#vkGetSwapchainImagesKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyImage-device-parameter) VUID-vkDestroyImage-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyImage-image-parameter) VUID-vkDestroyImage-image-parameter

 If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `image` **must** be a valid [VkImage](#VkImage) handle

* 
[](#VUID-vkDestroyImage-pAllocator-parameter) VUID-vkDestroyImage-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyImage-image-parent) VUID-vkDestroyImage-image-parent

 If `image` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `image` **must** be externally synchronized

Valid uses of a [VkImage](#VkImage) **may** depend on the image’s *format features*,
defined below.
Such constraints are documented in the affected valid usage statement.

* 
If the image was created with [VK_IMAGE_TILING_LINEAR](#VkImageTiling), then its set
of *format features* is the value of
[VkFormatProperties](formats.html#VkFormatProperties)::`linearTilingFeatures` found by calling
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) on the same `format` as
[VkImageCreateInfo](#VkImageCreateInfo)::`format`.

* 
If the image was created with [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling),
but without an
[Android    hardware buffer external format](memory.html#memory-external-android-hardware-buffer-external-formats),
or a
[QNX Screen Buffer    external format](memory.html#memory-external-screen-buffer-external-formats)
or an
[VkBufferCollectionImageCreateInfoFUCHSIA](#VkBufferCollectionImageCreateInfoFUCHSIA),
then its set of *format features* is the value of
[VkFormatProperties](formats.html#VkFormatProperties)::`optimalTilingFeatures` found by calling
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) on the same `format` as
[VkImageCreateInfo](#VkImageCreateInfo)::`format`.

* 
If the image was created with an
[Android    hardware buffer external format](memory.html#memory-external-android-hardware-buffer-external-formats), then its set of *format features* is
the value of
[VkAndroidHardwareBufferFormatPropertiesANDROID](memory.html#VkAndroidHardwareBufferFormatPropertiesANDROID)::`formatFeatures`
found by calling [vkGetAndroidHardwareBufferPropertiesANDROID](memory.html#vkGetAndroidHardwareBufferPropertiesANDROID) on
the Android hardware buffer that was imported to the
[VkDeviceMemory](memory.html#VkDeviceMemory) to which the image is bound.

* 
If the image was created with an
[QNX Screen buffer    external format](memory.html#memory-external-screen-buffer-external-formats), then its set of *format features* is the value of
[VkScreenBufferFormatPropertiesQNX](memory.html#VkScreenBufferFormatPropertiesQNX)::`formatFeatures` found by
calling [vkGetScreenBufferPropertiesQNX](memory.html#vkGetScreenBufferPropertiesQNX) on the QNX Screen buffer
that was imported to the [VkDeviceMemory](memory.html#VkDeviceMemory) to which the image is
bound.

* 
If the image was created with
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then:

The image’s DRM format modifier is the value of
[VkImageDrmFormatModifierPropertiesEXT](#VkImageDrmFormatModifierPropertiesEXT)::`drmFormatModifier`
found by calling [vkGetImageDrmFormatModifierPropertiesEXT](#vkGetImageDrmFormatModifierPropertiesEXT).

* 
Let
[VkDrmFormatModifierPropertiesListEXT](formats.html#VkDrmFormatModifierPropertiesListEXT)::`pDrmFormatModifierProperties`
be the array found by calling
[vkGetPhysicalDeviceFormatProperties2](formats.html#vkGetPhysicalDeviceFormatProperties2) on the same `format` as
[VkImageCreateInfo](#VkImageCreateInfo)::`format`.

* 
Let `VkDrmFormatModifierPropertiesEXT prop` be the array element whose
`drmFormatModifier` member is the value of the image’s DRM format
modifier.

* 
Then the image’s set of *format features* is the value of
`prop`::`drmFormatModifierTilingFeatures`.

A *corner-sampled image* is an image where unnormalized texel coordinates
are centered on integer values rather than half-integer values.

A corner-sampled image has a number of differences compared to conventional
texture image:

* 
Texels are centered on integer coordinates.
See [Unnormalized Texel Coordinate    Operations](textures.html#textures-unnormalized-to-integer)

* 
Normalized coordinates are scaled using coord × (dim - 1)
rather than coord × dim, where dim is the size of one
dimension of the image.
See [normalized texel coordinate    transform](textures.html#textures-normalized-to-unnormalized).

* 
Partial derivatives are scaled using coord × (dim - 1)
rather than coord × dim.
See [Scale Factor Operation](textures.html#textures-scale-factor).

* 
Calculation of the next higher LOD size goes according to
⌈dim / 2⌉ rather than ⌊dim / 2⌋.
See [Image Mip Level Sizing](#resources-image-mip-level-sizing).

* 
The minimum level size is 2x2 for 2D images and 2x2x2 for 3D images.
See [Image Mip Level Sizing](#resources-image-mip-level-sizing).

Corner-sampling is only supported for 2D and 3D images.
When sampling a corner-sampled image, the sampler addressing mode **must** be
[VK_SAMPLER_ADDRESS_MODE_CLAMP_TO_EDGE](samplers.html#VkSamplerAddressMode).
Corner-sampled images are not supported as cube maps or depth/stencil
images.

A *complete mipmap chain* is the full set of mip levels, from the largest
mip level provided, down to the *minimum mip level size*.

For conventional images, the dimensions of each successive mip level,
n+1, are:

`width`n+1 = max(⌊`width`n/2⌋,
1)

`height`n+1 = max(⌊`height`n/2⌋,
1)

`depth`n+1 = max(⌊`depth`n/2⌋,
1)

where `width`n, `height`n, and `depth`n
are the dimensions of the next larger mip level, n.

The minimum mip level size is:

* 
1 for one-dimensional images,

* 
1x1 for two-dimensional images, and

* 
1x1x1 for three-dimensional images.

The number of levels in a complete mipmap chain is:

⌊log2(max(`width`0, `height`0,
`depth`0))⌋ +  1

where `width`0, `height`0, and `depth`0
are the dimensions of the largest (most detailed) mip level, `0`.

For corner-sampled images, the dimensions of each successive mip level,
n+1, are:

`width`n+1 = max(⌈`width`n/2⌉, 2)

`height`n+1 = max(⌈`height`n/2⌉,
2)

`depth`n+1 = max(⌈`depth`n/2⌉, 2)

where `width`n, `height`n, and `depth`n
are the dimensions of the next larger mip level, n.

The minimum mip level size is:

* 
2x2 for two-dimensional images, and

* 
2x2x2 for three-dimensional images.

The number of levels in a complete mipmap chain is:

⌈log2(max(`width`0, `height`0,
`depth`0))⌉

where `width`0, `height`0, and `depth`0
are the dimensions of the largest (most detailed) mip level, `0`.

To allow for a replay tool to capture and replay image descriptors used with
[descriptor heaps](descriptorheaps.html#descriptorheaps), opaque data **must** be captured during
the initial recording and provided when recreating the image during replay,
using the following functions:

To get the opaque capture descriptor data for images, call:

// Provided by VK_EXT_descriptor_heap
VkResult vkGetImageOpaqueCaptureDataEXT(
    VkDevice                                    device,
    uint32_t                                    imageCount,
    const VkImage*                              pImages,
    VkHostAddressRangeEXT*                      pDatas);

* 
`device` is the logical device that gets the data.

* 
`imageCount` is the number of images to retrieve data from.

* 
`pImages` is a pointer to an array of [VkImage](#VkImage) objects to
retrieve the opaque capture data from.

* 
`pDatas` is a pointer to an array of [VkHostAddressRangeEXT](fundamentals.html#VkHostAddressRangeEXT)
structures defining the host address ranges where each image’s opaque
capture data will be written.

Valid Usage

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-descriptorHeapCaptureReplay-11282) VUID-vkGetImageOpaqueCaptureDataEXT-descriptorHeapCaptureReplay-11282

The [    `descriptorHeapCaptureReplay`](features.html#features-descriptorHeapCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-size-11283) VUID-vkGetImageOpaqueCaptureDataEXT-size-11283

The `size` member of each element of `pDatas` **must** be equal to
[    `imageCaptureReplayOpaqueDataSize`](limits.html#limits-imageCaptureReplayOpaqueDataSize)

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-device-11284) VUID-vkGetImageOpaqueCaptureDataEXT-device-11284

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-pImages-11285) VUID-vkGetImageOpaqueCaptureDataEXT-pImages-11285

Each element of `pImages` **must** have been created with
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits) set in
[VkImageCreateInfo](#VkImageCreateInfo)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-device-parameter) VUID-vkGetImageOpaqueCaptureDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-pImages-parameter) VUID-vkGetImageOpaqueCaptureDataEXT-pImages-parameter

 `pImages` **must** be a valid pointer to an array of `imageCount` valid [VkImage](#VkImage) handles

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-pDatas-parameter) VUID-vkGetImageOpaqueCaptureDataEXT-pDatas-parameter

 `pDatas` **must** be a valid pointer to an array of `imageCount` [VkHostAddressRangeEXT](fundamentals.html#VkHostAddressRangeEXT) structures

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-imageCount-arraylength) VUID-vkGetImageOpaqueCaptureDataEXT-imageCount-arraylength

 `imageCount` **must** be greater than `0`

* 
[](#VUID-vkGetImageOpaqueCaptureDataEXT-pImages-parent) VUID-vkGetImageOpaqueCaptureDataEXT-pImages-parent

 Each element of `pImages` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkOpaqueCaptureDataCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkOpaqueCaptureDataCreateInfoEXT {
    VkStructureType                      sType;
    const void*                          pNext;
    const VkHostAddressRangeConstEXT*    pData;
} VkOpaqueCaptureDataCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pData` is a pointer to the range of host memory containing opaque
data previously captured via [vkGetImageOpaqueCaptureDataEXT](#vkGetImageOpaqueCaptureDataEXT).

When an image is created with
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits) set in
[VkImageCreateInfo](#VkImageCreateInfo)::`flags`, if the `pNext` chain of
[VkImageCreateInfo](#VkImageCreateInfo) includes this structure, and `pData` is not
`NULL`, the implementation will attempt to recreate the image such that
descriptors written with [vkWriteResourceDescriptorsEXT](descriptorheaps.html#vkWriteResourceDescriptorsEXT) will be
reproduced with the same bit pattern as during capture if possible.
If the implementation is unable to recreate the image based on this data,
image creation will fail and return
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](fundamentals.html#VkResult).

When a tensor is created with
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM) set in
[VkTensorCreateInfoARM](#VkTensorCreateInfoARM)::`flags`, if the `pNext` chain of
[VkTensorCreateInfoARM](#VkTensorCreateInfoARM) includes this structure, and `pData` is not
`NULL`, the implementation will attempt to recreate the tensor such that
descriptors written with [vkWriteResourceDescriptorsEXT](descriptorheaps.html#vkWriteResourceDescriptorsEXT) will be
reproduced with the same bit pattern as during capture if possible.
If the implementation is unable to recreate the tensor based on this data,
tensor creation will fail and return
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](fundamentals.html#VkResult).

If this structure is not present, it is equivalent to setting `pData` to
`NULL`.

Valid Usage (Implicit)

* 
[](#VUID-VkOpaqueCaptureDataCreateInfoEXT-sType-sType) VUID-VkOpaqueCaptureDataCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPAQUE_CAPTURE_DATA_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkOpaqueCaptureDataCreateInfoEXT-pData-parameter) VUID-VkOpaqueCaptureDataCreateInfoEXT-pData-parameter

 If `pData` is not `NULL`, `pData` **must** be a valid pointer to a valid [VkHostAddressRangeConstEXT](fundamentals.html#VkHostAddressRangeConstEXT) structure

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](#VkImageCreateInfo)

* 
[VkTensorCreateInfoARM](#VkTensorCreateInfoARM)

To allow for a replay tool to capture and replay tensor descriptors used
with [descriptor heaps](descriptorheaps.html#descriptorheaps), opaque data **must** be captured
during the initial recording and provided when recreating the tensor during
replay, using the following functions:

To get the opaque capture descriptor data for tensors, call:

// Provided by VK_EXT_descriptor_heap with VK_ARM_tensors
VkResult vkGetTensorOpaqueCaptureDataARM(
    VkDevice                                    device,
    uint32_t                                    tensorCount,
    const VkTensorARM*                          pTensors,
    VkHostAddressRangeEXT*                      pDatas);

* 
`device` is the logical device that gets the data.

* 
`tensorCount` is the number of tensors to retrieve data from.

* 
`pTensors` is a pointer to an array of [VkTensorARM](#VkTensorARM) objects to
retrieve the opaque capture data from.

* 
`pDatas` is a pointer to an array of [VkHostAddressRangeEXT](fundamentals.html#VkHostAddressRangeEXT)
structures defining the host address ranges where each tensor’s opaque
capture data will be written.

Valid Usage

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-descriptorHeapCaptureReplay-11391) VUID-vkGetTensorOpaqueCaptureDataARM-descriptorHeapCaptureReplay-11391

The [    `descriptorHeapCaptureReplay`](features.html#features-descriptorHeapCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-size-11392) VUID-vkGetTensorOpaqueCaptureDataARM-size-11392

The `size` member of each element of `pDatas` **must** be equal to
[    `tensorCaptureReplayOpaqueDataSize`](limits.html#limits-tensorCaptureReplayOpaqueDataSize)

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-device-11393) VUID-vkGetTensorOpaqueCaptureDataARM-device-11393

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-11394) VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-11394

Each element of `pTensors` **must** have been created with
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM) set in
[VkTensorCreateInfoARM](#VkTensorCreateInfoARM)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-device-parameter) VUID-vkGetTensorOpaqueCaptureDataARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-parameter) VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-parameter

 `pTensors` **must** be a valid pointer to an array of `tensorCount` valid [VkTensorARM](#VkTensorARM) handles

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-pDatas-parameter) VUID-vkGetTensorOpaqueCaptureDataARM-pDatas-parameter

 `pDatas` **must** be a valid pointer to an array of `tensorCount` [VkHostAddressRangeEXT](fundamentals.html#VkHostAddressRangeEXT) structures

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-tensorCount-arraylength) VUID-vkGetTensorOpaqueCaptureDataARM-tensorCount-arraylength

 `tensorCount` **must** be greater than `0`

* 
[](#VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-parent) VUID-vkGetTensorOpaqueCaptureDataARM-pTensors-parent

 Each element of `pTensors` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Images are stored in implementation-dependent opaque layouts in memory.
Each layout has limitations on what kinds of operations are supported for
image subresources using the layout.
At any given time, the data representing an image subresource in memory
exists in a particular layout which is determined by the most recent layout
transition that was performed on that image subresource.
Applications have control over which layout each image subresource uses, and
**can** transition an image subresource from one layout to another.
Transitions **can** happen with an image memory barrier, included as part of a
[vkCmdPipelineBarrier](synchronization.html#vkCmdPipelineBarrier) or a [vkCmdWaitEvents](synchronization.html#vkCmdWaitEvents) command buffer command
(see [Image Memory Barriers](synchronization.html#synchronization-image-memory-barriers)), or as part of a subpass
dependency within a render pass (see `VkSubpassDependency`).

Image layout is per-image subresource.
Separate image subresources of the same image **can** be in different layouts
at the same time, with the exception that depth and stencil aspects of a
given image subresource **can** only be in different layouts if the
[`separateDepthStencilLayouts`](features.html#features-separateDepthStencilLayouts)
feature is enabled.
When an `VkImageView` descriptor is accessed on the device, all image
subresources must be in a valid image layout.

|  | Each layout **may** offer optimal performance for a specific usage of image
| --- | --- |
memory.
For example, an image with a layout of
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](#VkImageLayout) **may** provide optimal
performance for use as a color attachment, but be unsupported for use in
transfer commands.
Applications **can** transition an image subresource from one layout to another
in order to achieve optimal performance when the image subresource is used
for multiple kinds of operations.
After initialization, applications need not use any layout other than the
general layout, though this **may** produce suboptimal performance on some
implementations. |

Upon creation, all image subresources of an image are initially in the same
layout, where that layout is selected by the
`VkImageCreateInfo`::`initialLayout` member.
The `initialLayout` **must** be either [VK_IMAGE_LAYOUT_UNDEFINED](#VkImageLayout) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#VkImageLayout) or
[VK_IMAGE_LAYOUT_PREINITIALIZED](#VkImageLayout).
If it is [VK_IMAGE_LAYOUT_PREINITIALIZED](#VkImageLayout), then the image data **can** be
preinitialized by the host while using this layout, and the transition away
from this layout will preserve that data.
If it is [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#VkImageLayout), then the image data is
interpreted to be zeroed.
If the memory bound to this image is not fully zeroed when the image is
transitioned to a different layout, the results are **undefined**.
If it is [VK_IMAGE_LAYOUT_UNDEFINED](#VkImageLayout), then the contents of the data are
considered to be **undefined**, and the transition away from this layout is not
guaranteed to preserve that data.
For either of these initial layouts, any image subresources **must** be
transitioned to another layout before they are accessed by the device.

Host access to image memory is only well-defined for
[linear](../appendices/glossary.html#glossary-linear-resource) images and for image subresources of
those images which are currently in any of the following layouts:

* 
[VK_IMAGE_LAYOUT_PREINITIALIZED](#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#VkImageLayout)

Calling [vkGetImageSubresourceLayout](#vkGetImageSubresourceLayout) for a linear image returns a
subresource layout mapping that is valid for either of those image layouts.

The set of image layouts consists of:

// Provided by VK_VERSION_1_0
typedef enum VkImageLayout {
    VK_IMAGE_LAYOUT_UNDEFINED = 0,
    VK_IMAGE_LAYOUT_GENERAL = 1,
    VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL = 2,
    VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL = 3,
    VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL = 4,
    VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL = 5,
    VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL = 6,
    VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL = 7,
    VK_IMAGE_LAYOUT_PREINITIALIZED = 8,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL = 1000117000,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL = 1000117001,
  // Provided by VK_VERSION_1_2
    VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL = 1000241000,
  // Provided by VK_VERSION_1_2
    VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL = 1000241001,
  // Provided by VK_VERSION_1_2
    VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL = 1000241002,
  // Provided by VK_VERSION_1_2
    VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL = 1000241003,
  // Provided by VK_VERSION_1_3
    VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL = 1000314000,
  // Provided by VK_VERSION_1_3
    VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL = 1000314001,
  // Provided by VK_VERSION_1_4
    VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ = 1000232000,
  // Provided by VK_KHR_swapchain
    VK_IMAGE_LAYOUT_PRESENT_SRC_KHR = 1000001002,
  // Provided by VK_KHR_video_decode_queue
    VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR = 1000024000,
  // Provided by VK_KHR_video_decode_queue
    VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR = 1000024001,
  // Provided by VK_KHR_video_decode_queue
    VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR = 1000024002,
  // Provided by VK_KHR_shared_presentable_image
    VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR = 1000111000,
  // Provided by VK_EXT_fragment_density_map
    VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT = 1000218000,
  // Provided by VK_KHR_fragment_shading_rate
    VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR = 1000164003,
  // Provided by VK_KHR_video_encode_queue
    VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR = 1000299000,
  // Provided by VK_KHR_video_encode_queue
    VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR = 1000299001,
  // Provided by VK_KHR_video_encode_queue
    VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR = 1000299002,
  // Provided by VK_EXT_attachment_feedback_loop_layout
    VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT = 1000339000,
  // Provided by VK_ARM_tensors
    VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM = 1000460000,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR = 1000553000,
  // Provided by VK_EXT_zero_initialize_device_memory
    VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT = 1000620000,
  // Provided by VK_KHR_maintenance2
    VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL_KHR = VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL,
  // Provided by VK_KHR_maintenance2
    VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL_KHR = VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL,
  // Provided by VK_NV_shading_rate_image
    VK_IMAGE_LAYOUT_SHADING_RATE_OPTIMAL_NV = VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR,
  // Provided by VK_KHR_dynamic_rendering_local_read
    VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ_KHR = VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL_KHR = VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL_KHR = VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL_KHR = VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL_KHR = VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL,
  // Provided by VK_KHR_synchronization2
    VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR = VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL,
  // Provided by VK_KHR_synchronization2
    VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR = VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL,
} VkImageLayout;

The type(s) of device access supported by each layout are:

* 
[VK_IMAGE_LAYOUT_UNDEFINED](#VkImageLayout) specifies that the layout is unknown.
Image memory **cannot** be transitioned into this layout.
This layout **can** be used as the `initialLayout` member of
[VkImageCreateInfo](#VkImageCreateInfo).
This layout **can** be used in place of the current image layout in a
layout transition, but doing so will cause the contents of the image’s
memory to be **undefined**.

* 
[VK_IMAGE_LAYOUT_PREINITIALIZED](#VkImageLayout) specifies that an image’s memory is
in a defined layout and **can** be populated by data, but that it has not
yet been initialized by the driver.
Image memory **cannot** be transitioned into this layout.
This layout **can** be used as the `initialLayout` member of
[VkImageCreateInfo](#VkImageCreateInfo).
This layout is intended to be used as the initial layout for an image
whose contents are written by the host, and hence the data **can** be
written to memory immediately, without first executing a layout
transition.
Currently, [VK_IMAGE_LAYOUT_PREINITIALIZED](#VkImageLayout) is only useful with
[linear](../appendices/glossary.html#glossary-linear-resource) images because there is not a
standard layout defined for [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling) images.

* 
[VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout) supports all types of device access,
unless specified otherwise.

* 
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#VkImageLayout) specifies that an image’s
memory is in a defined layout and is zeroed, but that it has not yet
been initialized by the driver.
Image memory **cannot** be transitioned into this layout.
This layout **can** be used as the `initialLayout` member of
[VkImageCreateInfo](#VkImageCreateInfo).
This layout is intended to be used as the initial layout for an image
whose contents are already zeroed, either from being explicitly set to
zero by an application or from being allocated with
[VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT](memory.html#VkMemoryAllocateFlagBitsKHR).

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL](#VkImageLayout) specifies a layout that **must**
only be used with attachment accesses in the graphics pipeline.

* 
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](#VkImageLayout) specifies a layout allowing read
only access as an attachment, or in shaders as a sampled image, combined
image/sampler, or input attachment.

* 
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](#VkImageLayout) **must** only be used as a
color or resolve attachment in a `VkFramebuffer`.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits) usage flag set.

* 
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](#VkImageLayout) specifies a
layout for both the depth and stencil aspects of a depth/stencil format
image allowing read and write access as a depth/stencil attachment.
It is equivalent to [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](#VkImageLayout) and
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](#VkImageLayout).

* 
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](#VkImageLayout) specifies a layout
for both the depth and stencil aspects of a depth/stencil format image
allowing read only access as a depth/stencil attachment or in shaders as
a sampled image, combined image/sampler, or input attachment.
It is equivalent to [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](#VkImageLayout) and
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](#VkImageLayout).

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](#VkImageLayout)
specifies a layout for depth/stencil format images allowing read and
write access to the stencil aspect as a stencil attachment, and read
only access to the depth aspect as a depth attachment or in shaders as a
sampled image, combined image/sampler, or input attachment.
It is equivalent to [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](#VkImageLayout) and
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](#VkImageLayout).

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](#VkImageLayout)
specifies a layout for depth/stencil format images allowing read and
write access to the depth aspect as a depth attachment, and read only
access to the stencil aspect as a stencil attachment or in shaders as a
sampled image, combined image/sampler, or input attachment.
It is equivalent to [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](#VkImageLayout) and
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](#VkImageLayout).

* 
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](#VkImageLayout) specifies a layout for
the depth aspect of a depth/stencil format image allowing read and write
access as a depth attachment.

* 
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](#VkImageLayout) specifies a layout for the
depth aspect of a depth/stencil format image allowing read-only access
as a depth attachment or in shaders as a sampled image, combined
image/sampler, or input attachment.

* 
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](#VkImageLayout) specifies a layout for
the stencil aspect of a depth/stencil format image allowing read and
write access as a stencil attachment.

* 
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](#VkImageLayout) specifies a layout for
the stencil aspect of a depth/stencil format image allowing read-only
access as a stencil attachment or in shaders as a sampled image,
combined image/sampler, or input attachment.

* 
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](#VkImageLayout) specifies a layout
allowing read-only access in a shader as a sampled image, combined
image/sampler, or input attachment.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits) usage bits enabled.

* 
[VK_IMAGE_LAYOUT_TRANSFER_SRC_OPTIMAL](#VkImageLayout) **must** only be used as a
source image of a transfer command (see the definition of
[](synchronization.html#synchronization-pipeline-stages-transfer)[VK_PIPELINE_STAGE_TRANSFER_BIT](synchronization.html#VkPipelineStageFlagBits)).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](#VkImageUsageFlagBits) usage flag set.

* 
[VK_IMAGE_LAYOUT_TRANSFER_DST_OPTIMAL](#VkImageLayout) **must** only be used as a
destination image of a transfer command.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_TRANSFER_DST_BIT](#VkImageUsageFlagBits) usage flag set.

* 
[VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](#VkImageLayout) **must** only be used for presenting
a presentable image for display.

* 
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](#VkImageLayout) is valid only for shared
presentable images, and **must** be used for any usage the image supports.

* 
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](#VkImageLayout) **must**
    only be used as a
    [fragment shading rate    attachment](primsrast.html#primsrast-fragment-shading-rate-attachment)
or
    [shading rate image](primsrast.html#primsrast-shading-rate-image).
    This layout is valid only for image subresources of images created with
    the [VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkImageUsageFlagBits) usage
    flag set.

* 
[VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](#VkImageLayout) **must** only be
used as a fragment density map attachment in a `VkRenderPass`.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkImageUsageFlagBits) usage flag set.

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](#VkImageLayout) **must** only be used as a
[decode output picture](videocoding.html#decode-output-picture) in a
[video decode operation](videocoding.html#video-decode-operations).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](#VkImageUsageFlagBits) usage flag set.

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](#VkImageLayout) is reserved for future use.

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](#VkImageLayout) **must** only be used as an
output [reconstructed picture](videocoding.html#reconstructed-picture) or an input
[reference picture](videocoding.html#reference-picture) in a [    video decode operation](videocoding.html#video-decode-operations).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](#VkImageUsageFlagBits) usage flag set.

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](#VkImageLayout) is reserved for future use.

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](#VkImageLayout) **must** only be used as an
[encode input picture](videocoding.html#encode-input-picture) in a
[video encode operation](videocoding.html#video-encode-operations).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](#VkImageUsageFlagBits) usage flag set.

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](#VkImageLayout) **must** only be used as an
output [reconstructed picture](videocoding.html#reconstructed-picture) or an input
[reference picture](videocoding.html#reference-picture) in a [    video encode operation](videocoding.html#video-encode-operations).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](#VkImageUsageFlagBits) usage flag set.

* 
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](#VkImageLayout) **must** only be
used as either a color attachment or depth/stencil attachment and/or
read-only access in a shader as a sampled image, combined image/sampler,
or input attachment.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkImageUsageFlagBits) usage flag
set, and either the [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits) usage flags set, and
either the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits) usage flags set

* 
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](#VkImageLayout) **must** only be used as either
a storage image, or a color or depth/stencil attachment and an input
attachment.
This layout is valid only for image subresources of images created with
either the [VK_IMAGE_USAGE_STORAGE_BIT](#VkImageUsageFlagBits) usage flag set, or both the
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits) and either of the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits) usage flags set.

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](#VkImageLayout) **must** only be
used as a [quantization map](videocoding.html#encode-quantization-map) in a
[video encode operation](videocoding.html#video-encode-operations).
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits) usage flags set.

* 
[VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](#VkImageLayout) specifies the layout that an
image created with [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling) **must** be in, if the
[`unifiedImageLayouts`](features.html#features-unifiedImageLayouts) feature is
disabled, or **may** be in if it is enabled, for it and a tensor bound to
the same aliased range of memory to consistently interpret the data in
memory.
See [Memory Aliasing](#resources-memory-aliasing) for a complete set of rules for
tensor/image aliasing.
This layout is valid only for image subresources of images created with
the [VK_IMAGE_USAGE_TENSOR_ALIASING_BIT_ARM](#VkImageUsageFlagBits) usage flag set.

The layout of each image subresource is not a state of the image subresource
itself, but is rather a property of how the data in memory is organized, and
thus for each mechanism of accessing an image in the API the application
**must** specify a parameter or structure member that indicates which image
layout the image subresource(s) are considered to be in when the image will
be accessed.
For transfer commands, this is a parameter to the command (see [Clear Commands](clears.html#clears)
and [Copy Commands](copies.html#copies)).
For use as a framebuffer attachment, this is a member in the substructures
of the [VkRenderPassCreateInfo](renderpass.html#VkRenderPassCreateInfo) (see [Render Pass](renderpass.html#renderpass)).
For use in a descriptor set, this is a member in the
`VkDescriptorImageInfo` structure (see [Descriptor Set Updates](descriptorsets.html#descriptors-sets-updates)).

If the [`unifiedImageLayouts`](features.html#features-unifiedImageLayouts) feature
is enabled, the [VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout) image layout **may** be used in
place of the other layouts where allowed with no loss of performance.

|  | [VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout) can be a useful catch-all image layout, but
| --- | --- |
there are situations where a dedicated image layout must be used instead.
Some examples include:

* 
[VK_IMAGE_LAYOUT_PRESENT_SRC_KHR](#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_VIDEO_DECODE_SRC_KHR](#VkImageLayout),
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DST_KHR](#VkImageLayout), and
[VK_IMAGE_LAYOUT_VIDEO_DECODE_DPB_KHR](#VkImageLayout)
without the
[`unifiedImageLayoutsVideo`](features.html#features-unifiedImageLayoutsVideo)
feature

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_SRC_KHR](#VkImageLayout),
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DST_KHR](#VkImageLayout), and
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_DPB_KHR](#VkImageLayout)
without the
[`unifiedImageLayoutsVideo`](features.html#features-unifiedImageLayoutsVideo)
feature

* 
[VK_IMAGE_LAYOUT_VIDEO_ENCODE_QUANTIZATION_MAP_KHR](#VkImageLayout)
without the
[`unifiedImageLayoutsVideo`](features.html#features-unifiedImageLayoutsVideo)
feature |

|  | While [VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout) suggests that all types of device access
| --- | --- |
is possible, it does not mean that all patterns of memory accesses are safe
in all situations.
[Common Render Pass Data Races](renderpass.html#common-render-pass-data-races) outlines
some situations where data races are unavoidable.
For example, when a subresource is used as both an attachment and a sampled
image (i.e., not an input attachment), [enabling feedback loop](renderpass.html#renderpass-feedbackloop) adds extra guarantees which [VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout)
alone does not. |

At the time that any command buffer command accessing an image executes on
any queue, the layouts of the image subresources that are accessed **must** all
match exactly the layout specified via the API controlling those
accesses,
except in case of accesses to an image with a depth/stencil format performed
through descriptors referring to only a single aspect of the image, where
the following relaxed matching rules apply:

* 
Descriptors referring just to the depth aspect of a depth/stencil image
only need to match in the image layout of the depth aspect, thus
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](#VkImageLayout) and
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](#VkImageLayout) are
considered to match.

* 
Descriptors referring just to the stencil aspect of a depth/stencil
image only need to match in the image layout of the stencil aspect, thus
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](#VkImageLayout) and
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](#VkImageLayout) are
considered to match.

When performing a layout transition on an image subresource, the old layout
value **must** either equal the current layout of the image subresource (at the
time the transition executes), or else be [VK_IMAGE_LAYOUT_UNDEFINED](#VkImageLayout)
(implying that the contents of the image subresource need not be preserved).
The new layout used in a transition **must** not be any of:

* 
[VK_IMAGE_LAYOUT_UNDEFINED](#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_PREINITIALIZED](#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#VkImageLayout)

The image layout of each image subresource of a depth/stencil image created
with [VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](#VkImageCreateFlagBits) is
dependent on the last sample locations used to render to the image
subresource as a depth/stencil attachment, thus applications **must** provide
the same sample locations that were last used to render to the given image
subresource whenever a layout transition of the image subresource happens,
otherwise the contents of the depth aspect of the image subresource become
**undefined**.

In addition, depth reads from a depth/stencil attachment referring to an
image subresource range of a depth/stencil image created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](#VkImageCreateFlagBits) using
different sample locations than what have been last used to perform depth
writes to the image subresources of the same image subresource range return
**undefined** values.

Similarly, depth writes to a depth/stencil attachment referring to an image
subresource range of a depth/stencil image created with
[VK_IMAGE_CREATE_SAMPLE_LOCATIONS_COMPATIBLE_DEPTH_BIT_EXT](#VkImageCreateFlagBits) using
different sample locations than what have been last used to perform depth
writes to the image subresources of the same image subresource range make
the contents of the depth aspect of those image subresources **undefined**.

When images created with external memory handle types listed in the
[external image implied layouts table](#resources-external-image-layouts)
are accessed outside of Vulkan, they **must** be in the layout specified in the
table, and **can** be assumed to be in that layout when they are accessed in
Vulkan after external access.

| External Memory Handle Type | Implied Layout When Accessed Externally |
| --- | --- |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) | [VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout) |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) | [VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout) |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_BIT_NV](memory.html#VkExternalMemoryHandleTypeFlagBitsNV) | [VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout) |
| [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_KMT_BIT_NV](memory.html#VkExternalMemoryHandleTypeFlagBitsNV) | [VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout) |

Image objects are not directly accessed by pipeline shaders for reading or
writing image data.
Instead, *image views* representing contiguous ranges of the image
subresources and containing additional metadata are used for that purpose.
Views **must** be created on images of compatible types, and **must** represent a
valid subset of image subresources.

Image views are represented by `VkImageView` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkImageView)

[VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS) is a special constant value used for image
views to indicate that all remaining array layers in an image after the base
layer should be included in the view.

#define VK_REMAINING_ARRAY_LAYERS         (~0U)

[VK_REMAINING_MIP_LEVELS](#VK_REMAINING_MIP_LEVELS) is a special constant value used for image
views to indicate that all remaining mipmap levels in an image after the
base level should be included in the view.

#define VK_REMAINING_MIP_LEVELS           (~0U)

The types of image views that **can** be created are:

// Provided by VK_VERSION_1_0
typedef enum VkImageViewType {
    VK_IMAGE_VIEW_TYPE_1D = 0,
    VK_IMAGE_VIEW_TYPE_2D = 1,
    VK_IMAGE_VIEW_TYPE_3D = 2,
    VK_IMAGE_VIEW_TYPE_CUBE = 3,
    VK_IMAGE_VIEW_TYPE_1D_ARRAY = 4,
    VK_IMAGE_VIEW_TYPE_2D_ARRAY = 5,
    VK_IMAGE_VIEW_TYPE_CUBE_ARRAY = 6,
} VkImageViewType;

To create an image view, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateImageView(
    VkDevice                                    device,
    const VkImageViewCreateInfo*                pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkImageView*                                pView);

* 
`device` is the logical device that creates the image view.

* 
`pCreateInfo` is a pointer to a [VkImageViewCreateInfo](#VkImageViewCreateInfo)
structure containing parameters to be used to create the image view.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pView` is a pointer to a [VkImageView](#VkImageView) handle in which the
resulting image view object is returned.

Valid Usage

* 
[](#VUID-vkCreateImageView-device-09667) VUID-vkCreateImageView-device-09667

`device` **must** support at least one queue family with one of the
[VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits),
[VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits),
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capabilities

* 
[](#VUID-vkCreateImageView-image-09179) VUID-vkCreateImageView-image-09179

[VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` **must** have been created from
`device`

Valid Usage (Implicit)

* 
[](#VUID-vkCreateImageView-device-parameter) VUID-vkCreateImageView-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateImageView-pCreateInfo-parameter) VUID-vkCreateImageView-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkImageViewCreateInfo](#VkImageViewCreateInfo) structure

* 
[](#VUID-vkCreateImageView-pAllocator-parameter) VUID-vkCreateImageView-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateImageView-pView-parameter) VUID-vkCreateImageView-pView-parameter

 `pView` **must** be a valid pointer to a [VkImageView](#VkImageView) handle

* 
[](#VUID-vkCreateImageView-device-queuecount) VUID-vkCreateImageView-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkImageViewCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageViewCreateInfo {
    VkStructureType            sType;
    const void*                pNext;
    VkImageViewCreateFlags     flags;
    VkImage                    image;
    VkImageViewType            viewType;
    VkFormat                   format;
    VkComponentMapping         components;
    VkImageSubresourceRange    subresourceRange;
} VkImageViewCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkImageViewCreateFlagBits](#VkImageViewCreateFlagBits) specifying
additional parameters of the image view.

* 
`image` is a [VkImage](#VkImage) on which the view will be created.

* 
`viewType` is a [VkImageViewType](#VkImageViewType) value specifying the type of
the image view.

* 
`format` is a [VkFormat](formats.html#VkFormat) specifying the format and type used to
interpret texel blocks of the image.

* 
`components` is a [VkComponentMapping](#VkComponentMapping) structure specifying a
remapping of color components (or of depth or stencil components after
they have been converted into color components).

* 
`subresourceRange` is a [VkImageSubresourceRange](#VkImageSubresourceRange) structure
selecting the set of mipmap levels and array layers to be accessible to
the view.

Some of the `image` creation parameters are inherited by the view.
In particular, image view creation inherits the implicit parameter
`usage` specifying the allowed usages of the image view that, by
default, takes the value of the corresponding `usage` parameter
specified in [VkImageCreateInfo](#VkImageCreateInfo) at image creation time.
The implicit `usage` **can** be overridden by adding a
[VkImageViewUsageCreateInfo](#VkImageViewUsageCreateInfo) structure to the `pNext` chain, but the
view usage **must** be a subset of the image usage.
If `image` has a depth-stencil format and was created with a
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure included in the `pNext`
chain of [VkImageCreateInfo](#VkImageCreateInfo), the usage is calculated based on the
`subresource.aspectMask` provided:

* 
If `aspectMask` includes only [VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits), the
implicit `usage` is equal to
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo)::`stencilUsage`.

* 
If `aspectMask` includes only [VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits), the
implicit `usage` is equal to [VkImageCreateInfo](#VkImageCreateInfo)::`usage`.

* 
If both aspects are included in `aspectMask`, the implicit
`usage` is equal to the intersection of
[VkImageCreateInfo](#VkImageCreateInfo)::`usage` and
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo)::`stencilUsage`.

If `image` is a 3D image, its Z range **can** be restricted to a subset by
adding a [VkImageViewSlicedCreateInfoEXT](#VkImageViewSlicedCreateInfoEXT) to the `pNext` chain.

If `image` was created with the [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits)
flag,
and if the `format` of the image is not [multi-planar](formats.html#formats-multiplanar)
`format` **can** be different from the image’s format, but if
`image` was created without the
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#VkImageCreateFlagBits) flag and
they are not equal they **must** be *compatible*.
Image format compatibility is defined in the
[Format Compatibility Classes](formats.html#formats-compatibility-classes) section.
Views of compatible formats will have the same mapping between texel
coordinates and memory locations irrespective of the `format`, with only
the interpretation of the bit pattern changing.

If `image` was created with a [multi-planar format](formats.html#formats-multiplanar), and the image view’s `aspectMask` is one of
[VK_IMAGE_ASPECT_PLANE_0_BIT](#VkImageAspectFlagBits), [VK_IMAGE_ASPECT_PLANE_1_BIT](#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_PLANE_2_BIT](#VkImageAspectFlagBits), the view’s aspect mask is considered to
be equivalent to [VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits) when used as a framebuffer
attachment.

|  | Values intended to be used with one view format **may** not be exactly
| --- | --- |
preserved when written or read through a different format.
For example, an integer value that happens to have the bit pattern of a
floating-point denorm or NaN **may** be flushed or canonicalized when written
or read through a view with a floating-point format.
Similarly, a value written through a signed normalized format that has a bit
pattern exactly equal to -2b **may** be changed to -2b +  1
as described in [Conversion from Normalized Fixed-Point to Floating-Point](fundamentals.html#fundamentals-fixedfpconv). |

If `image` was created with the
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#VkImageCreateFlagBits) flag, `format`
**must** be *compatible* with the image’s format as described above; or **must**
be an uncompressed format, in which case it **must** be
[*size-compatible*](formats.html#formats-size-compatibility) with the image’s format.
In this case, the resulting image view’s texel dimensions equal the
dimensions of the selected mip level divided by the compressed texel block
size and rounded up.

The [VkComponentMapping](#VkComponentMapping) `components` member describes a remapping
from components of the image to components of the vector returned by shader
image instructions.
This remapping **must** be the identity swizzle for
any `VkImageView` used with a combined image sampler that enables
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion),
input attachment descriptors, framebuffer attachments,
and
storage image descriptors.

If the image view is to be used with a sampler which supports
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion), an *identically
defined object* of type [VkSamplerYcbcrConversion](samplers.html#VkSamplerYcbcrConversion) to that used to
create the sampler **must** be passed to [vkCreateImageView](#vkCreateImageView) in a
[VkSamplerYcbcrConversionInfo](samplers.html#VkSamplerYcbcrConversionInfo) included in the `pNext` chain of
[VkImageViewCreateInfo](#VkImageViewCreateInfo).
Conversely, if a [VkSamplerYcbcrConversion](samplers.html#VkSamplerYcbcrConversion) object is passed to
[vkCreateImageView](#vkCreateImageView), an [identically defined](../appendices/glossary.html#glossary-identically-defined) [VkSamplerYcbcrConversion](samplers.html#VkSamplerYcbcrConversion) object **must** be used when sampling
the image.

If the image has a [multi-planar format](formats.html#formats-multiplanar),
`subresourceRange.aspectMask` is [VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits), and
`usage` includes [VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits), then the `format`
**must** be identical to the image `format` and the sampler to be used with
the image view **must** enable [sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion).

When such an image is used in a [video coding](videocoding.html#video-coding) operation, the
[sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) has no effect.

If `image` was created with the [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits)
and the image has a [multi-planar format](formats.html#formats-multiplanar), and if
`subresourceRange.aspectMask` is [VK_IMAGE_ASPECT_PLANE_0_BIT](#VkImageAspectFlagBits),
[VK_IMAGE_ASPECT_PLANE_1_BIT](#VkImageAspectFlagBits), or [VK_IMAGE_ASPECT_PLANE_2_BIT](#VkImageAspectFlagBits),
`format` **must** be [compatible](formats.html#formats-compatible-planes) with the
corresponding plane of the image, and the sampler to be used with the image
view **must** not enable [sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion).
The `width` and `height` of the single-plane image view **must** be
derived from the multi-planar image’s dimensions in the manner listed for
[plane compatibility](formats.html#formats-compatible-planes) for the plane.

Any view of an image plane will have the same mapping between texel
coordinates and memory locations as used by the components of the color
aspect, subject to the formulae relating texel coordinates to
lower-resolution planes as described in [Chroma Reconstruction](textures.html#textures-chroma-reconstruction).
That is, if an R or B plane has a reduced resolution relative to the G plane
of the multi-planar image, the image view operates using the (*uplane*,
*vplane*) unnormalized coordinates of the reduced-resolution plane, and
these coordinates access the same memory locations as the (*ucolor*,
*vcolor*) unnormalized coordinates of the color aspect for which chroma
reconstruction operations operate on the same (*uplane*, *vplane*) or
(*iplane*, *jplane*) coordinates.

| Image View Type | Compatible Image Types |
| --- | --- |
| [VK_IMAGE_VIEW_TYPE_1D](#VkImageViewType) | [VK_IMAGE_TYPE_1D](#VkImageType) |
| [VK_IMAGE_VIEW_TYPE_1D_ARRAY](#VkImageViewType) | [VK_IMAGE_TYPE_1D](#VkImageType) |
| [VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) | [VK_IMAGE_TYPE_2D](#VkImageType)
, [VK_IMAGE_TYPE_3D](#VkImageType) |
| [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType) | [VK_IMAGE_TYPE_2D](#VkImageType)
, [VK_IMAGE_TYPE_3D](#VkImageType) |
| [VK_IMAGE_VIEW_TYPE_CUBE](#VkImageViewType) | [VK_IMAGE_TYPE_2D](#VkImageType) |
| [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](#VkImageViewType) | [VK_IMAGE_TYPE_2D](#VkImageType) |
| [VK_IMAGE_VIEW_TYPE_3D](#VkImageViewType) | [VK_IMAGE_TYPE_3D](#VkImageType) |

Valid Usage

* 
[](#VUID-VkImageViewCreateInfo-image-01003) VUID-VkImageViewCreateInfo-image-01003

If `image` was not created with
[VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](#VkImageCreateFlagBits) then `viewType` **must** not
be [VK_IMAGE_VIEW_TYPE_CUBE](#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](#VkImageViewType)

* 
[](#VUID-VkImageViewCreateInfo-viewType-01004) VUID-VkImageViewCreateInfo-viewType-01004

If the [`imageCubeArray`](features.html#features-imageCubeArray) feature is not
enabled, `viewType` **must** not be [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](#VkImageViewType)

* 
[](#VUID-VkImageViewCreateInfo-image-06723) VUID-VkImageViewCreateInfo-image-06723

If `image` was created with [VK_IMAGE_TYPE_3D](#VkImageType) but without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits) set then `viewType`
**must** not be [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType)

* 
[](#VUID-VkImageViewCreateInfo-image-06728) VUID-VkImageViewCreateInfo-image-06728

If `image` was created with [VK_IMAGE_TYPE_3D](#VkImageType) but without
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits) or
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](#VkImageCreateFlagBits) set, then
`viewType` **must** not be [VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType)

* 
[](#VUID-VkImageViewCreateInfo-image-04970) VUID-VkImageViewCreateInfo-image-04970

If `image` was created with [VK_IMAGE_TYPE_3D](#VkImageType) and
`viewType` is [VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType) then `subresourceRange.levelCount`
**must** be 1

* 
[](#VUID-VkImageViewCreateInfo-image-04972) VUID-VkImageViewCreateInfo-image-04972

If `image` was created with a `samples` value not equal to
[VK_SAMPLE_COUNT_1_BIT](limits.html#VkSampleCountFlagBits) then `viewType` **must** be either
[VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType)

* 
[](#VUID-VkImageViewCreateInfo-image-04441) VUID-VkImageViewCreateInfo-image-04441

`image` **must** have been created with a `usage` value containing
at least one of the following:

[VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_STORAGE_BIT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_SAMPLE_WEIGHT_BIT_QCOM](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_SAMPLE_BLOCK_MATCH_BIT_QCOM](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits)

[](#VUID-VkImageViewCreateInfo-None-02273) VUID-VkImageViewCreateInfo-None-02273

The [format features](#resources-image-view-format-features) of the
resultant image view **must** contain at least one bit

[](#VUID-VkImageViewCreateInfo-usage-02274) VUID-VkImageViewCreateInfo-usage-02274

If `usage` contains [VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits), then the
[format features](#resources-image-view-format-features) of the
resultant image view **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkImageViewCreateInfo-usage-02275) VUID-VkImageViewCreateInfo-usage-02275

If `usage` contains [VK_IMAGE_USAGE_STORAGE_BIT](#VkImageUsageFlagBits), then the image
view’s [format features](#resources-image-view-format-features) **must**
contain [VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkImageViewCreateInfo-usage-08931) VUID-VkImageViewCreateInfo-usage-08931

If `usage` contains [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits), then
the image view’s [format    features](#resources-image-view-format-features) **must** contain [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits) or
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

[](#VUID-VkImageViewCreateInfo-usage-02277) VUID-VkImageViewCreateInfo-usage-02277

If `usage` contains
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits), then the image view’s
[format features](#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkImageViewCreateInfo-image-08333) VUID-VkImageViewCreateInfo-image-08333

If `usage` contains [VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](#VkImageUsageFlagBits),
then the image view’s [format    features](#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_VIDEO_DECODE_OUTPUT_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkImageViewCreateInfo-image-08334) VUID-VkImageViewCreateInfo-image-08334

If `usage` contains [VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](#VkImageUsageFlagBits),
then the image view’s [format    features](#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_VIDEO_DECODE_DPB_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkImageViewCreateInfo-image-08335) VUID-VkImageViewCreateInfo-image-08335

`usage` **must** not include
[VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](#VkImageUsageFlagBits)

[](#VUID-VkImageViewCreateInfo-image-08336) VUID-VkImageViewCreateInfo-image-08336

If `usage` contains [VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](#VkImageUsageFlagBits),
then the image view’s [format    features](#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_VIDEO_ENCODE_INPUT_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkImageViewCreateInfo-image-08337) VUID-VkImageViewCreateInfo-image-08337

If `usage` contains [VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](#VkImageUsageFlagBits),
then the image view’s [format    features](#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_VIDEO_ENCODE_DPB_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkImageViewCreateInfo-image-08338) VUID-VkImageViewCreateInfo-image-08338

`usage` **must** not include
[VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](#VkImageUsageFlagBits)

[](#VUID-VkImageViewCreateInfo-usage-10259) VUID-VkImageViewCreateInfo-usage-10259

If `usage` contains
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits), then
the image view’s [format    features](#resources-image-view-format-features) **must** contain
[VK_FORMAT_FEATURE_2_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](formats.html#VkFormatFeatureFlagBits2KHR)

[](#VUID-VkImageViewCreateInfo-usage-10260) VUID-VkImageViewCreateInfo-usage-10260

If `usage` contains
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits), then the image
view’s [format features](#resources-image-view-format-features) **must**
contain [VK_FORMAT_FEATURE_2_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](formats.html#VkFormatFeatureFlagBits2KHR)

[](#VUID-VkImageViewCreateInfo-usage-08932) VUID-VkImageViewCreateInfo-usage-08932

If `usage` contains [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits),
and any of the following is true:

* 
the [`externalFormatResolve`](features.html#features-externalFormatResolve)
feature is not enabled

* 
the [     `nullColorAttachmentWithExternalFormatResolve`](limits.html#limits-nullColorAttachmentWithExternalFormatResolve) property is
[VK_FALSE](fundamentals.html#VK_FALSE)

* 
`image` was created with an
[VkExternalFormatANDROID](#VkExternalFormatANDROID)::`externalFormat` value of 0

then the image view’s [format features](#resources-image-view-format-features) **must** contain at least one of
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits) or
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)
    or [VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](formats.html#VkFormatFeatureFlagBits2KHR)

[](#VUID-VkImageViewCreateInfo-subresourceRange-01478) VUID-VkImageViewCreateInfo-subresourceRange-01478

`subresourceRange.baseMipLevel` **must** be less than the
`mipLevels` specified in [VkImageCreateInfo](#VkImageCreateInfo) when `image`
was created

[](#VUID-VkImageViewCreateInfo-subresourceRange-01718) VUID-VkImageViewCreateInfo-subresourceRange-01718

If `subresourceRange.levelCount` is not
[VK_REMAINING_MIP_LEVELS](#VK_REMAINING_MIP_LEVELS), `subresourceRange.baseMipLevel`
+  `subresourceRange.levelCount` **must** be less than or equal to
the `mipLevels` specified in [VkImageCreateInfo](#VkImageCreateInfo) when
`image` was created

[](#VUID-VkImageViewCreateInfo-image-02571) VUID-VkImageViewCreateInfo-image-02571

If `image` was created with the
[VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkImageUsageFlagBits) usage flag set,
`subresourceRange.levelCount` **must** be `1`

[](#VUID-VkImageViewCreateInfo-image-06724) VUID-VkImageViewCreateInfo-image-06724

If `image` is not a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits) or
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](#VkImageCreateFlagBits) set, or `viewType`
is not [VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType),
`subresourceRange.baseArrayLayer` **must** be less than the
`arrayLayers` specified in [VkImageCreateInfo](#VkImageCreateInfo) when `image`
was created

[](#VUID-VkImageViewCreateInfo-subresourceRange-06725) VUID-VkImageViewCreateInfo-subresourceRange-06725

If `subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS), `image` is not a 3D image created
with [VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits) or
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](#VkImageCreateFlagBits) set, or `viewType`
is not [VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType),
`subresourceRange.layerCount` **must** be non-zero and
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
`arrayLayers` specified in [VkImageCreateInfo](#VkImageCreateInfo) when `image`
was created

[](#VUID-VkImageViewCreateInfo-image-02724) VUID-VkImageViewCreateInfo-image-02724

If `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits) set, and `viewType` is
[VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType),
`subresourceRange.baseArrayLayer` **must** be less than the depth
computed from `baseMipLevel` and `extent.depth` specified in
[VkImageCreateInfo](#VkImageCreateInfo) when `image` was created, according to the
formula defined in [Image Mip Level    Sizing](#resources-image-mip-level-sizing)

[](#VUID-VkImageViewCreateInfo-subresourceRange-02725) VUID-VkImageViewCreateInfo-subresourceRange-02725

If `subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS), `image` is a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits) set, and `viewType` is
[VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType),
`subresourceRange.layerCount` **must** be non-zero and
`subresourceRange.baseArrayLayer` + 
`subresourceRange.layerCount` **must** be less than or equal to the
depth computed from `baseMipLevel` and `extent.depth` specified
in [VkImageCreateInfo](#VkImageCreateInfo) when `image` was created, according to
the formula defined in [Image Mip    Level Sizing](#resources-image-mip-level-sizing)

[](#VUID-VkImageViewCreateInfo-image-01761) VUID-VkImageViewCreateInfo-image-01761

If `image` was created with the
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits) flag,
but without the [VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#VkImageCreateFlagBits)
flag,
and if the `format` of the `image` is not a
[multi-planar format](formats.html#formats-multiplanar),
`format` **must** be compatible with the `format` used to create
`image`, as defined in [Format    Compatibility Classes](formats.html#formats-compatibility-classes)

[](#VUID-VkImageViewCreateInfo-image-01583) VUID-VkImageViewCreateInfo-image-01583

If `image` was created with the
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#VkImageCreateFlagBits) flag, `format`
**must** be compatible with, or **must** be an uncompressed format that is
[size-compatible](formats.html#formats-size-compatibility) with, the `format`
used to create `image`

[](#VUID-VkImageViewCreateInfo-image-07072) VUID-VkImageViewCreateInfo-image-07072

If `image` was created with the
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#VkImageCreateFlagBits) flag and
`format` is a non-compressed format, the `levelCount` member of
`subresourceRange` **must** be `1`

[](#VUID-VkImageViewCreateInfo-image-09487) VUID-VkImageViewCreateInfo-image-09487

If `image` was created with the
[VK_IMAGE_CREATE_BLOCK_TEXEL_VIEW_COMPATIBLE_BIT](#VkImageCreateFlagBits) flag,
the
`VkPhysicalDeviceMaintenance6Properties`::`blockTexelViewCompatibleMultipleLayers`
property is not [VK_TRUE](fundamentals.html#VK_TRUE),
and `format` is a non-compressed format, then the `layerCount`
member of `subresourceRange` **must** be `1`

[](#VUID-VkImageViewCreateInfo-pNext-01585) VUID-VkImageViewCreateInfo-pNext-01585

If a [VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo) structure was included in the
`pNext` chain of the [VkImageCreateInfo](#VkImageCreateInfo) structure used when
creating `image` and
[VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo)::`viewFormatCount` is not zero
then `format` **must** be one of the formats in
[VkImageFormatListCreateInfo](#VkImageFormatListCreateInfo)::`pViewFormats`

[](#VUID-VkImageViewCreateInfo-image-01586) VUID-VkImageViewCreateInfo-image-01586

If `image` was created with the
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits) flag, if the `format` of
the `image` is a [multi-planar format](formats.html#formats-multiplanar), and
if `subresourceRange.aspectMask` is one of the
[multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bits, then
`format` **must** be compatible with the [VkFormat](formats.html#VkFormat) for the plane
of the `image` `format` indicated by
`subresourceRange.aspectMask`, as defined in
[Compatible Formats of Planes of Multi-Planar Formats](formats.html#formats-compatible-planes)

[](#VUID-VkImageViewCreateInfo-subresourceRange-07818) VUID-VkImageViewCreateInfo-subresourceRange-07818

`subresourceRange.aspectMask` **must** only have at most 1 valid
[multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit

[](#VUID-VkImageViewCreateInfo-image-01762) VUID-VkImageViewCreateInfo-image-01762

If `image` was not created with the
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits) flag,
or if the `format` of the `image` is a [    multi-planar format](formats.html#formats-multiplanar) and if `subresourceRange.aspectMask` is
[VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits),
`format` **must** be identical to the `format` used to create
`image`

[](#VUID-VkImageViewCreateInfo-format-06415) VUID-VkImageViewCreateInfo-format-06415

If the image view [    requires a sampler Y′CBCR conversion](#image-views-requiring-sampler-ycbcr-conversion) and `usage` contains
[VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits), then the `pNext` chain **must**
include a [VkSamplerYcbcrConversionInfo](samplers.html#VkSamplerYcbcrConversionInfo) structure with a conversion
value other than [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

[](#VUID-VkImageViewCreateInfo-format-04714) VUID-VkImageViewCreateInfo-format-04714

If `format` has a `_422` or `_420` suffix then `image`
**must** have been created with a width that is a multiple of 2

[](#VUID-VkImageViewCreateInfo-format-04715) VUID-VkImageViewCreateInfo-format-04715

If `format` has a `_420` suffix then `image` **must** have been
created with a height that is a multiple of 2

[](#VUID-VkImageViewCreateInfo-pNext-01970) VUID-VkImageViewCreateInfo-pNext-01970

If the `pNext` chain includes a [VkSamplerYcbcrConversionInfo](samplers.html#VkSamplerYcbcrConversionInfo)
structure with a `conversion` value other than [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
all members of `components` **must** have the
[identity swizzle](#resources-image-views-identity-mappings)

[](#VUID-VkImageViewCreateInfo-pNext-06658) VUID-VkImageViewCreateInfo-pNext-06658

If the `pNext` chain includes a [VkSamplerYcbcrConversionInfo](samplers.html#VkSamplerYcbcrConversionInfo)
structure with a `conversion` value other than [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`format` **must** be the same used in
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo)::`format`

[](#VUID-VkImageViewCreateInfo-image-01020) VUID-VkImageViewCreateInfo-image-01020

If `image` is non-sparse then the image
or each specified *disjoint* plane
**must** be bound completely and contiguously to a single
`VkDeviceMemory` object

[](#VUID-VkImageViewCreateInfo-subResourceRange-01021) VUID-VkImageViewCreateInfo-subResourceRange-01021

`viewType` **must** be compatible with the type of `image` as shown
in the [view type compatibility    table](#resources-image-views-compatibility)

[](#VUID-VkImageViewCreateInfo-image-02399) VUID-VkImageViewCreateInfo-image-02399

If `image` has an
[Android    external format](memory.html#memory-external-android-hardware-buffer-external-formats), `format` **must** be [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

[](#VUID-VkImageViewCreateInfo-image-02400) VUID-VkImageViewCreateInfo-image-02400

If `image` has an
[Android    external format](memory.html#memory-external-android-hardware-buffer-external-formats), the `pNext` chain **must** include a
[VkSamplerYcbcrConversionInfo](samplers.html#VkSamplerYcbcrConversionInfo) structure with a `conversion`
object created with the same external format as `image`

[](#VUID-VkImageViewCreateInfo-image-02401) VUID-VkImageViewCreateInfo-image-02401

If `image` has an
[Android    external format](memory.html#memory-external-android-hardware-buffer-external-formats), all members of `components` **must** be the
[identity swizzle](#resources-image-views-identity-mappings)

[](#VUID-VkImageViewCreateInfo-image-08957) VUID-VkImageViewCreateInfo-image-08957

If `image` has an
[QNX Screen external    format](memory.html#memory-external-screen-buffer-external-formats), `format` **must** be [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

[](#VUID-VkImageViewCreateInfo-image-08958) VUID-VkImageViewCreateInfo-image-08958

If `image` has an
[QNX Screen external    format](memory.html#memory-external-screen-buffer-external-formats), the `pNext` chain **must** include a
[VkSamplerYcbcrConversionInfo](samplers.html#VkSamplerYcbcrConversionInfo) structure with a `conversion`
object created with the same external format as `image`

[](#VUID-VkImageViewCreateInfo-image-08959) VUID-VkImageViewCreateInfo-image-08959

If `image` has an
[QNX Screen external    format](memory.html#memory-external-screen-buffer-external-formats), all members of `components` **must** be the
[identity swizzle](#resources-image-views-identity-mappings)

[](#VUID-VkImageViewCreateInfo-image-02086) VUID-VkImageViewCreateInfo-image-02086

If `image` was created with the
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkImageUsageFlagBits) usage flag
set, `viewType` **must** be [VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType)

[](#VUID-VkImageViewCreateInfo-image-02087) VUID-VkImageViewCreateInfo-image-02087

If the [`shadingRateImage`](features.html#features-shadingRateImage) feature is
enabled, and `image` was created with the
[VK_IMAGE_USAGE_SHADING_RATE_IMAGE_BIT_NV](#VkImageUsageFlagBits) usage flag set,
`format` **must** be [VK_FORMAT_R8_UINT](formats.html#VkFormat)

[](#VUID-VkImageViewCreateInfo-usage-04550) VUID-VkImageViewCreateInfo-usage-04550

If the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is enabled, and the
`usage` for the image view includes
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkImageUsageFlagBits), then the
image view’s [format features](#resources-image-view-format-features)
**must** contain
[VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

[](#VUID-VkImageViewCreateInfo-usage-04551) VUID-VkImageViewCreateInfo-usage-04551

If the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is enabled, the
`usage` for the image view includes
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkImageUsageFlagBits), and
[    `layeredShadingRateAttachments`](limits.html#limits-layeredShadingRateAttachments) is [VK_FALSE](fundamentals.html#VK_FALSE),
`subresourceRange.layerCount` **must** be `1`

[](#VUID-VkImageViewCreateInfo-flags-02572) VUID-VkImageViewCreateInfo-flags-02572

If the [    `fragmentDensityMapDynamic`](features.html#features-fragmentDensityMapDynamic) feature is not enabled, `flags`
**must** not contain
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](#VkImageViewCreateFlagBits)

[](#VUID-VkImageViewCreateInfo-flags-03567) VUID-VkImageViewCreateInfo-flags-03567

If the [    `fragmentDensityMapDeferred`](features.html#features-fragmentDensityMapDeferred) feature is not enabled, `flags`
**must** not contain
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT](#VkImageViewCreateFlagBits)

[](#VUID-VkImageViewCreateInfo-flags-03568) VUID-VkImageViewCreateInfo-flags-03568

If `flags` contains
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT](#VkImageViewCreateFlagBits),
`flags` **must** not contain
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](#VkImageViewCreateFlagBits)

[](#VUID-VkImageViewCreateInfo-image-03569) VUID-VkImageViewCreateInfo-image-03569

If `image` was created with `flags` containing
[VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](#VkImageCreateFlagBits) and the
[VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits) usage flag set,
`subresourceRange.layerCount` **must** be less than or equal to
[    `VkPhysicalDeviceFragmentDensityMap2PropertiesEXT`::`maxSubsampledArrayLayers`](limits.html#limits-maxSubsampledArrayLayers)

[](#VUID-VkImageViewCreateInfo-invocationMask-04993) VUID-VkImageViewCreateInfo-invocationMask-04993

If the [`invocationMask`](features.html#features-invocationMask) feature is
enabled, and `image` was created with the
[VK_IMAGE_USAGE_INVOCATION_MASK_BIT_HUAWEI](#VkImageUsageFlagBits) usage flag set,
`format` **must** be [VK_FORMAT_R8_UINT](formats.html#VkFormat)

[](#VUID-VkImageViewCreateInfo-flags-04116) VUID-VkImageViewCreateInfo-flags-04116

If `flags` does not contain
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](#VkImageViewCreateFlagBits), and
`image` was created with the
[VK_IMAGE_USAGE_FRAGMENT_DENSITY_MAP_BIT_EXT](#VkImageUsageFlagBits) usage flag set, its
`flags` **must** not contain any of
[VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits),
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits),
[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits), or
[VK_IMAGE_CREATE_SPARSE_ALIASED_BIT](#VkImageCreateFlagBits)

[](#VUID-VkImageViewCreateInfo-pNext-02662) VUID-VkImageViewCreateInfo-pNext-02662

If the `pNext` chain includes a [VkImageViewUsageCreateInfo](#VkImageViewUsageCreateInfo)
structure, and `image` was not created with a
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure included in the
`pNext` chain of [VkImageCreateInfo](#VkImageCreateInfo), its `usage` member
**must** not include any bits that were not set in the `usage` member
of the [VkImageCreateInfo](#VkImageCreateInfo) structure used to create `image`

[](#VUID-VkImageViewCreateInfo-pNext-02663) VUID-VkImageViewCreateInfo-pNext-02663

If the `pNext` chain includes a [VkImageViewUsageCreateInfo](#VkImageViewUsageCreateInfo)
structure, `image` was created with a
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure included in the
`pNext` chain of [VkImageCreateInfo](#VkImageCreateInfo), and
`subresourceRange.aspectMask` includes
[VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits), the `usage` member of the
[VkImageViewUsageCreateInfo](#VkImageViewUsageCreateInfo) structure **must** not include any bits
that were not set in the `usage` member of the
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure used to create `image`

[](#VUID-VkImageViewCreateInfo-pNext-02664) VUID-VkImageViewCreateInfo-pNext-02664

If the `pNext` chain includes a [VkImageViewUsageCreateInfo](#VkImageViewUsageCreateInfo)
structure, `image` was created with a
[VkImageStencilUsageCreateInfo](#VkImageStencilUsageCreateInfo) structure included in the
`pNext` chain of [VkImageCreateInfo](#VkImageCreateInfo), and
`subresourceRange.aspectMask` includes bits other than
[VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits), the `usage` member of the
[VkImageViewUsageCreateInfo](#VkImageViewUsageCreateInfo) structure **must** not include any bits
that were not set in the `usage` member of the
[VkImageCreateInfo](#VkImageCreateInfo) structure used to create `image`

[](#VUID-VkImageViewCreateInfo-imageViewType-04973) VUID-VkImageViewCreateInfo-imageViewType-04973

If `viewType` is [VK_IMAGE_VIEW_TYPE_1D](#VkImageViewType),
[VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType), or [VK_IMAGE_VIEW_TYPE_3D](#VkImageViewType); and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS), then `subresourceRange.layerCount`
**must** be 1

[](#VUID-VkImageViewCreateInfo-imageViewType-04974) VUID-VkImageViewCreateInfo-imageViewType-04974

If `viewType` is [VK_IMAGE_VIEW_TYPE_1D](#VkImageViewType),
[VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType), or [VK_IMAGE_VIEW_TYPE_3D](#VkImageViewType); and
`subresourceRange.layerCount` is [VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS),
then the remaining number of layers **must** be 1

[](#VUID-VkImageViewCreateInfo-viewType-02960) VUID-VkImageViewCreateInfo-viewType-02960

If `viewType` is [VK_IMAGE_VIEW_TYPE_CUBE](#VkImageViewType) and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS), `subresourceRange.layerCount` **must**
be `6`

[](#VUID-VkImageViewCreateInfo-viewType-02961) VUID-VkImageViewCreateInfo-viewType-02961

If `viewType` is [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](#VkImageViewType) and
`subresourceRange.layerCount` is not
[VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS), `subresourceRange.layerCount` **must**
be a multiple of `6`

[](#VUID-VkImageViewCreateInfo-viewType-02962) VUID-VkImageViewCreateInfo-viewType-02962

If `viewType` is [VK_IMAGE_VIEW_TYPE_CUBE](#VkImageViewType) and
`subresourceRange.layerCount` is [VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS),
the remaining number of layers **must** be `6`

[](#VUID-VkImageViewCreateInfo-viewType-02963) VUID-VkImageViewCreateInfo-viewType-02963

If `viewType` is [VK_IMAGE_VIEW_TYPE_CUBE_ARRAY](#VkImageViewType) and
`subresourceRange.layerCount` is [VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS),
the remaining number of layers **must** be a multiple of `6`

[](#VUID-VkImageViewCreateInfo-imageViewFormatSwizzle-04465) VUID-VkImageViewCreateInfo-imageViewFormatSwizzle-04465

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`imageViewFormatSwizzle`
is [VK_FALSE](fundamentals.html#VK_FALSE), all elements of `components` **must** have the
[identity swizzle](#resources-image-views-identity-mappings)

[](#VUID-VkImageViewCreateInfo-imageViewFormatReinterpretation-04466) VUID-VkImageViewCreateInfo-imageViewFormatReinterpretation-04466

If the `[VK_KHR_portability_subset](../appendices/extensions.html#VK_KHR_portability_subset)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](features.html#VkPhysicalDevicePortabilitySubsetFeaturesKHR)::`imageViewFormatReinterpretation`
is [VK_FALSE](fundamentals.html#VK_FALSE), the [VkFormat](formats.html#VkFormat) in `format` **must** not contain
a different number of components, or a different number of bits in each
component, than the format of the `VkImage` in `image`

[](#VUID-VkImageViewCreateInfo-image-04817) VUID-VkImageViewCreateInfo-image-04817

If `image` was created with the
[VK_IMAGE_USAGE_VIDEO_DECODE_DST_BIT_KHR](#VkImageUsageFlagBits) usage flag set,
[VK_IMAGE_USAGE_VIDEO_DECODE_SRC_BIT_KHR](#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_VIDEO_DECODE_DPB_BIT_KHR](#VkImageUsageFlagBits), then the `viewType`
**must** be [VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType)

[](#VUID-VkImageViewCreateInfo-image-04818) VUID-VkImageViewCreateInfo-image-04818

If `image` was created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_DST_BIT_KHR](#VkImageUsageFlagBits) usage flag set,
[VK_IMAGE_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](#VkImageUsageFlagBits), or
[VK_IMAGE_USAGE_VIDEO_ENCODE_DPB_BIT_KHR](#VkImageUsageFlagBits), then the `viewType`
**must** be [VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType)

[](#VUID-VkImageViewCreateInfo-image-10261) VUID-VkImageViewCreateInfo-image-10261

If `image` was created with the
[VK_IMAGE_USAGE_VIDEO_ENCODE_QUANTIZATION_DELTA_MAP_BIT_KHR](#VkImageUsageFlagBits) or
[VK_IMAGE_USAGE_VIDEO_ENCODE_EMPHASIS_MAP_BIT_KHR](#VkImageUsageFlagBits) usage flags set,
then `viewType` **must** be [VK_IMAGE_VIEW_TYPE_2D](#VkImageViewType) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType)

[](#VUID-VkImageViewCreateInfo-flags-08106) VUID-VkImageViewCreateInfo-flags-08106

If `flags` includes
[VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkImageViewCreateFlagBits), the
[    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

[](#VUID-VkImageViewCreateInfo-pNext-08107) VUID-VkImageViewCreateInfo-pNext-08107

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) structure, `flags`
**must** contain
[VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkImageViewCreateFlagBits)

[](#VUID-VkImageViewCreateInfo-pNext-06787) VUID-VkImageViewCreateInfo-pNext-06787

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT) structure, its
`exportObjectType` member **must** be
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](memory.html#VkExportMetalObjectTypeFlagBitsEXT)

[](#VUID-VkImageViewCreateInfo-pNext-06944) VUID-VkImageViewCreateInfo-pNext-06944

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure, then
[`textureSampleWeighted`](features.html#features-textureSampleWeighted) feature
**must** be enabled

[](#VUID-VkImageViewCreateInfo-pNext-06945) VUID-VkImageViewCreateInfo-pNext-06945

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure, then `image`
**must** have been created with the
[VK_IMAGE_USAGE_SAMPLE_WEIGHT_BIT_QCOM](#VkImageUsageFlagBits) usage flag set

[](#VUID-VkImageViewCreateInfo-pNext-06946) VUID-VkImageViewCreateInfo-pNext-06946

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure, then
`components` **must** be [VK_COMPONENT_SWIZZLE_IDENTITY](#VkComponentSwizzle) for all
components

[](#VUID-VkImageViewCreateInfo-pNext-06947) VUID-VkImageViewCreateInfo-pNext-06947

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure, then
`subresourceRange.aspectMask` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits)

[](#VUID-VkImageViewCreateInfo-pNext-06948) VUID-VkImageViewCreateInfo-pNext-06948

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure, then
`subresourceRange.levelCount` **must** be `1`

[](#VUID-VkImageViewCreateInfo-pNext-06949) VUID-VkImageViewCreateInfo-pNext-06949

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure, then
`viewType` **must** be [VK_IMAGE_VIEW_TYPE_1D_ARRAY](#VkImageViewType) or
[VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType)

[](#VUID-VkImageViewCreateInfo-pNext-06950) VUID-VkImageViewCreateInfo-pNext-06950

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure and if
`viewType` is [VK_IMAGE_VIEW_TYPE_1D_ARRAY](#VkImageViewType), then `image`
**must** have been created with `imageType` [VK_IMAGE_TYPE_1D](#VkImageType)

[](#VUID-VkImageViewCreateInfo-pNext-06951) VUID-VkImageViewCreateInfo-pNext-06951

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure and `viewType`
is [VK_IMAGE_VIEW_TYPE_1D_ARRAY](#VkImageViewType), then
`subresourceRange.layerCount` **must** be equal to `2`

[](#VUID-VkImageViewCreateInfo-pNext-06952) VUID-VkImageViewCreateInfo-pNext-06952

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure and `viewType`
is [VK_IMAGE_VIEW_TYPE_1D_ARRAY](#VkImageViewType), then `image` **must** have been
created with `width` equal to or greater than \((numPhases
\times \mathbin{max}\left(
\mathbin{align}\left(filterSize.width,4\right),
filterSize.height\right))\)

[](#VUID-VkImageViewCreateInfo-pNext-06953) VUID-VkImageViewCreateInfo-pNext-06953

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure and if
`viewType` is [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType), then `image`
**must** have been created with `imageType` [VK_IMAGE_TYPE_2D](#VkImageType)

[](#VUID-VkImageViewCreateInfo-pNext-06954) VUID-VkImageViewCreateInfo-pNext-06954

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure and `viewType`
is [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType), then
`subresourceRange.layerCount` **must** be equal or greater than
numPhases

[](#VUID-VkImageViewCreateInfo-pNext-06955) VUID-VkImageViewCreateInfo-pNext-06955

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure and `viewType`
is [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType), then `image` **must** have been
created with `width` equal to or greater than `filterSize.width`

[](#VUID-VkImageViewCreateInfo-pNext-06956) VUID-VkImageViewCreateInfo-pNext-06956

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure and `viewType`
is [VK_IMAGE_VIEW_TYPE_2D_ARRAY](#VkImageViewType), then `image` **must** have been
created with `height` equal to or greater than
`filterSize.height`

[](#VUID-VkImageViewCreateInfo-pNext-06957) VUID-VkImageViewCreateInfo-pNext-06957

If the `pNext` chain includes
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM) structure then
[VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM)::`filterSize.height`
**must** be less than or equal to [    `VkPhysicalDeviceImageProcessingPropertiesQCOM`::`maxWeightFilterDimension.height`](devsandqueues.html#limits-weightfilter-maxdimension)

[](#VUID-VkImageViewCreateInfo-subresourceRange-09594) VUID-VkImageViewCreateInfo-subresourceRange-09594

`subresourceRange.aspectMask` **must** be valid for the `format`
the `image` was created with

[](#VUID-VkImageViewCreateInfo-None-12280) VUID-VkImageViewCreateInfo-None-12280

    If
Vulkan 1.3 is not supported and
    the [`ycbcr2plane444Formats`](features.html#features-ycbcr2plane444Formats)
    feature is not enabled, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](formats.html#VkFormat),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](formats.html#VkFormat)

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewCreateInfo-sType-sType) VUID-VkImageViewCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageViewCreateInfo-pNext-pNext) VUID-VkImageViewCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT), [VkImageViewASTCDecodeModeEXT](#VkImageViewASTCDecodeModeEXT), [VkImageViewMinLodCreateInfoEXT](#VkImageViewMinLodCreateInfoEXT), [VkImageViewSampleWeightCreateInfoQCOM](#VkImageViewSampleWeightCreateInfoQCOM), [VkImageViewSlicedCreateInfoEXT](#VkImageViewSlicedCreateInfoEXT), [VkImageViewUsageCreateInfo](#VkImageViewUsageCreateInfo), [VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT), or [VkSamplerYcbcrConversionInfo](samplers.html#VkSamplerYcbcrConversionInfo)

* 
[](#VUID-VkImageViewCreateInfo-sType-unique) VUID-VkImageViewCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](memory.html#VkExportMetalObjectCreateInfoEXT)

* 
[](#VUID-VkImageViewCreateInfo-flags-parameter) VUID-VkImageViewCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkImageViewCreateFlagBits](#VkImageViewCreateFlagBits) values

* 
[](#VUID-VkImageViewCreateInfo-image-parameter) VUID-VkImageViewCreateInfo-image-parameter

 `image` **must** be a valid [VkImage](#VkImage) handle

* 
[](#VUID-VkImageViewCreateInfo-viewType-parameter) VUID-VkImageViewCreateInfo-viewType-parameter

 `viewType` **must** be a valid [VkImageViewType](#VkImageViewType) value

* 
[](#VUID-VkImageViewCreateInfo-format-parameter) VUID-VkImageViewCreateInfo-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkImageViewCreateInfo-components-parameter) VUID-VkImageViewCreateInfo-components-parameter

 `components` **must** be a valid [VkComponentMapping](#VkComponentMapping) structure

* 
[](#VUID-VkImageViewCreateInfo-subresourceRange-parameter) VUID-VkImageViewCreateInfo-subresourceRange-parameter

 `subresourceRange` **must** be a valid [VkImageSubresourceRange](#VkImageSubresourceRange) structure

Bits which **can** be set in [VkImageViewCreateInfo](#VkImageViewCreateInfo)::`flags`,
specifying additional parameters of an image view, are:

// Provided by VK_VERSION_1_0
typedef enum VkImageViewCreateFlagBits {
  // Provided by VK_EXT_fragment_density_map
    VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT = 0x00000001,
  // Provided by VK_EXT_descriptor_buffer
    VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT = 0x00000004,
  // Provided by VK_EXT_fragment_density_map2
    VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT = 0x00000002,
} VkImageViewCreateFlagBits;

* 
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](#VkImageViewCreateFlagBits)
specifies that the fragment density map will be read by device during
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT](#VkImageViewCreateFlagBits)
specifies that the fragment density map will be read by the host during
[vkEndCommandBuffer](cmdbuffers.html#vkEndCommandBuffer) for the primary command buffer that the render
pass is recorded into

* 
[VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkImageViewCreateFlagBits)
specifies that the image view **can** be used with descriptor buffers when
capturing and replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) for more detail.

// Provided by VK_VERSION_1_0
typedef VkFlags VkImageViewCreateFlags;

`VkImageViewCreateFlags` is a bitmask type for setting a mask of zero or
more [VkImageViewCreateFlagBits](#VkImageViewCreateFlagBits).

The set of usages for the created image view **can** be restricted compared to
the parent image’s `usage` flags by adding a
`VkImageViewUsageCreateInfo` structure to the `pNext` chain of
[VkImageViewCreateInfo](#VkImageViewCreateInfo).

The `VkImageViewUsageCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkImageViewUsageCreateInfo {
    VkStructureType      sType;
    const void*          pNext;
    VkImageUsageFlags    usage;
} VkImageViewUsageCreateInfo;

// Provided by VK_KHR_maintenance2
// Equivalent to VkImageViewUsageCreateInfo
typedef VkImageViewUsageCreateInfo VkImageViewUsageCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`usage` is a bitmask of [VkImageUsageFlagBits](#VkImageUsageFlagBits) specifying
allowed usages of the image view.

When this structure is chained to [VkImageViewCreateInfo](#VkImageViewCreateInfo) the
`usage` field overrides the implicit `usage` parameter inherited
from image creation time and its value is used instead for the purposes of
determining the valid usage conditions of [VkImageViewCreateInfo](#VkImageViewCreateInfo).

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewUsageCreateInfo-sType-sType) VUID-VkImageViewUsageCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageViewUsageCreateInfo-usage-parameter) VUID-VkImageViewUsageCreateInfo-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](#VkImageUsageFlagBits) values

* 
[](#VUID-VkImageViewUsageCreateInfo-usage-requiredbitmask) VUID-VkImageViewUsageCreateInfo-usage-requiredbitmask

 `usage` **must** not be `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](#VkImageViewCreateInfo)

The range of 3D slices for the created image view **can** be restricted to a
subset of the parent image’s Z range by adding a
`VkImageViewSlicedCreateInfoEXT` structure to the `pNext` chain of
[VkImageViewCreateInfo](#VkImageViewCreateInfo).

The `VkImageViewSlicedCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_image_sliced_view_of_3d
typedef struct VkImageViewSlicedCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           sliceOffset;
    uint32_t           sliceCount;
} VkImageViewSlicedCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sliceOffset` is the Z-offset for the first 3D slice accessible to
the image view.

* 
`sliceCount` is the number of 3D slices accessible to the image
view.

When this structure is chained to [VkImageViewCreateInfo](#VkImageViewCreateInfo) the
`sliceOffset` field is treated as a Z-offset for the sliced view and
`sliceCount` specifies the range.
Shader accesses using a Z coordinate of 0 will access the depth slice
corresponding to `sliceOffset` in the image, and in a shader, the
maximum in-bounds Z coordinate for the view is `sliceCount` - 1.

A sliced 3D view **must** only be used with a single mip level.
The slice coordinates are integer coordinates within the
`subresourceRange.baseMipLevel` used to create the image view.

The effective view depth is equal to `extent.depth` used to create the
`image` for this view adjusted by `subresourceRange.baseMipLevel` as
specified in [Image Mip Level Sizing](#resources-image-mip-level-sizing).

Shader access to this image view is only affected by
`VkImageViewSlicedCreateInfoEXT` if it uses a descriptor of type
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType).
For access using any other descriptor type, the contents of
`VkImageViewSlicedCreateInfoEXT` are ignored; instead, `sliceOffset`
is treated as being equal to 0, and `sliceCount` is treated as being
equal to [VK_REMAINING_3D_SLICES_EXT](#VK_REMAINING_3D_SLICES_EXT).

Valid Usage

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-sliceOffset-07867) VUID-VkImageViewSlicedCreateInfoEXT-sliceOffset-07867

`sliceOffset` **must** be less than the effective view depth as
specified in [Image Mip Level Sizing](#resources-image-mip-level-sizing)

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-sliceCount-07868) VUID-VkImageViewSlicedCreateInfoEXT-sliceCount-07868

If `sliceCount` is not [VK_REMAINING_3D_SLICES_EXT](#VK_REMAINING_3D_SLICES_EXT), it **must** be
non-zero and `sliceOffset` +  `sliceCount` **must** be
less than or equal to the effective view depth as specified in
[Image Mip Level Sizing](#resources-image-mip-level-sizing)

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-image-07869) VUID-VkImageViewSlicedCreateInfoEXT-image-07869

`image` **must** have been created with `imageType` equal to
[VK_IMAGE_TYPE_3D](#VkImageType)

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-viewType-07909) VUID-VkImageViewSlicedCreateInfoEXT-viewType-07909

`viewType` **must** be [VK_IMAGE_VIEW_TYPE_3D](#VkImageViewType)

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-None-07870) VUID-VkImageViewSlicedCreateInfoEXT-None-07870

The image view **must** reference exactly 1 mip level

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-None-07871) VUID-VkImageViewSlicedCreateInfoEXT-None-07871

The [imageSlicedViewOf3D](features.html#features-imageSlicedViewOf3D) feature **must**
be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewSlicedCreateInfoEXT-sType-sType) VUID-VkImageViewSlicedCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_SLICED_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](#VkImageViewCreateInfo)

[VK_REMAINING_3D_SLICES_EXT](#VK_REMAINING_3D_SLICES_EXT) is a special constant value used for
[VkImageViewSlicedCreateInfoEXT](#VkImageViewSlicedCreateInfoEXT)::`sliceCount` to indicate that all
remaining 3D slices in an image after the first slice offset specified
should be included in the view.

#define VK_REMAINING_3D_SLICES_EXT        (~0U)

The `VkImageSubresourceRange` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkImageSubresourceRange {
    VkImageAspectFlags    aspectMask;
    uint32_t              baseMipLevel;
    uint32_t              levelCount;
    uint32_t              baseArrayLayer;
    uint32_t              layerCount;
} VkImageSubresourceRange;

* 
`aspectMask` is a bitmask of [VkImageAspectFlagBits](#VkImageAspectFlagBits) specifying
which aspect(s) of the image are included in the view.

* 
`baseMipLevel` is the first mipmap level accessible to the view.

* 
`levelCount` is the number of mipmap levels (starting from
`baseMipLevel`) accessible to the view.

* 
`baseArrayLayer` is the first array layer accessible to the view.

* 
`layerCount` is the number of array layers (starting from
`baseArrayLayer`) accessible to the view.

The number of mipmap levels and array layers **must** be a subset of the image
subresources in the image.
If an application wants to use all mip levels or layers in an image after
the `baseMipLevel` or `baseArrayLayer`, it **can** set `levelCount`
and `layerCount` to the special values [VK_REMAINING_MIP_LEVELS](#VK_REMAINING_MIP_LEVELS) and
[VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS) without knowing the exact number of mip
levels or layers.

For cube and cube array image views, the layers of the image view starting
at `baseArrayLayer` correspond to faces in the order +X, -X, +Y, -Y, +Z,
-Z.
For cube arrays, each set of six sequential layers is a single cube, so the
number of cube maps in a cube map array view is *`layerCount` / 6*, and
image array layer (`baseArrayLayer` +  i) is face index
(i mod 6) of cube *i / 6*.
If the number of layers in the view, whether set explicitly in
`layerCount` or implied by [VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS), is not a
multiple of 6, the last cube map in the array **must** not be accessed.

`aspectMask` **must** be only [VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits),
[VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits) or [VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits) if
`format` is a color, depth-only or stencil-only format,
respectively, except if `format` is a [multi-planar format](formats.html#formats-multiplanar).
If using a depth/stencil format with both depth and stencil components,
`aspectMask` **must** include at least one of
[VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits) and [VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits), and
**can** include both.

When the `VkImageSubresourceRange` structure is used to select a subset
of the slices of a 3D image’s mip level in order to create a 2D or 2D array
image view of a 3D image created with
[VK_IMAGE_CREATE_2D_ARRAY_COMPATIBLE_BIT](#VkImageCreateFlagBits), `baseArrayLayer` and
`layerCount` specify the first slice index and the number of slices to
include in the created image view.
Such an image view **can** be used as a framebuffer attachment that refers only
to the specified range of slices of the selected mip level.
If the [`maintenance9`](features.html#features-maintenance9) feature is not enabled,
any layout transitions performed on such an attachment view during a render
pass instance still apply to the entire subresource referenced which
includes all the slices of the selected mip level.

When using an image view of a depth/stencil image to populate a descriptor
set (e.g. for sampling in the shader, or for use as an input attachment),
the `aspectMask` **must** only include one bit, which selects whether the
image view is used for depth reads (i.e. using a floating-point sampler or
input attachment in the shader) or stencil reads (i.e. using an unsigned
integer sampler or input attachment in the shader).
When an image view of a depth/stencil image is used as a depth/stencil
framebuffer attachment, the `aspectMask` is ignored and both depth and
stencil image subresources are used.

When creating a `VkImageView`, if [sampler Y′CBCR conversion](samplers.html#samplers-YCbCr-conversion) is enabled in the sampler, the `aspectMask` of a
`subresourceRange` used by the `VkImageView` **must** be
[VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits).

When creating a `VkImageView`, if sampler Y′CBCR conversion is not
enabled in the sampler and the image `format` is [multi-planar format](formats.html#formats-multiplanar), the image **must** have been created with
[VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](#VkImageCreateFlagBits), and the `aspectMask` of the
`VkImageView`’s `subresourceRange` **must** be
[VK_IMAGE_ASPECT_PLANE_0_BIT](#VkImageAspectFlagBits), [VK_IMAGE_ASPECT_PLANE_1_BIT](#VkImageAspectFlagBits) or
[VK_IMAGE_ASPECT_PLANE_2_BIT](#VkImageAspectFlagBits).

Valid Usage

* 
[](#VUID-VkImageSubresourceRange-levelCount-01720) VUID-VkImageSubresourceRange-levelCount-01720

If `levelCount` is not [VK_REMAINING_MIP_LEVELS](#VK_REMAINING_MIP_LEVELS), it **must** be
greater than `0`

* 
[](#VUID-VkImageSubresourceRange-layerCount-01721) VUID-VkImageSubresourceRange-layerCount-01721

If `layerCount` is not [VK_REMAINING_ARRAY_LAYERS](#VK_REMAINING_ARRAY_LAYERS), it **must** be
greater than `0`

* 
[](#VUID-VkImageSubresourceRange-aspectMask-01670) VUID-VkImageSubresourceRange-aspectMask-01670

If `aspectMask` includes [VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits), then it
**must** not include any of [VK_IMAGE_ASPECT_PLANE_0_BIT](#VkImageAspectFlagBits),
[VK_IMAGE_ASPECT_PLANE_1_BIT](#VkImageAspectFlagBits), or [VK_IMAGE_ASPECT_PLANE_2_BIT](#VkImageAspectFlagBits)

* 
[](#VUID-VkImageSubresourceRange-aspectMask-02278) VUID-VkImageSubresourceRange-aspectMask-02278

`aspectMask` **must** not include
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` for any index *i*

Valid Usage (Implicit)

* 
[](#VUID-VkImageSubresourceRange-aspectMask-parameter) VUID-VkImageSubresourceRange-aspectMask-parameter

 `aspectMask` **must** be a valid combination of [VkImageAspectFlagBits](#VkImageAspectFlagBits) values

* 
[](#VUID-VkImageSubresourceRange-aspectMask-requiredbitmask) VUID-VkImageSubresourceRange-aspectMask-requiredbitmask

 `aspectMask` **must** not be `0`

Bits which **can** be set in an aspect mask to specify aspects of an image for
purposes such as identifying a subresource, are:

// Provided by VK_VERSION_1_0
typedef enum VkImageAspectFlagBits {
    VK_IMAGE_ASPECT_COLOR_BIT = 0x00000001,
    VK_IMAGE_ASPECT_DEPTH_BIT = 0x00000002,
    VK_IMAGE_ASPECT_STENCIL_BIT = 0x00000004,
    VK_IMAGE_ASPECT_METADATA_BIT = 0x00000008,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_ASPECT_PLANE_0_BIT = 0x00000010,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_ASPECT_PLANE_1_BIT = 0x00000020,
  // Provided by VK_VERSION_1_1
    VK_IMAGE_ASPECT_PLANE_2_BIT = 0x00000040,
  // Provided by VK_VERSION_1_3
    VK_IMAGE_ASPECT_NONE = 0,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_IMAGE_ASPECT_MEMORY_PLANE_0_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_IMAGE_ASPECT_MEMORY_PLANE_1_BIT_EXT = 0x00000100,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_IMAGE_ASPECT_MEMORY_PLANE_2_BIT_EXT = 0x00000200,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_IMAGE_ASPECT_MEMORY_PLANE_3_BIT_EXT = 0x00000400,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_IMAGE_ASPECT_PLANE_0_BIT_KHR = VK_IMAGE_ASPECT_PLANE_0_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_IMAGE_ASPECT_PLANE_1_BIT_KHR = VK_IMAGE_ASPECT_PLANE_1_BIT,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_IMAGE_ASPECT_PLANE_2_BIT_KHR = VK_IMAGE_ASPECT_PLANE_2_BIT,
  // Provided by VK_KHR_maintenance4
    VK_IMAGE_ASPECT_NONE_KHR = VK_IMAGE_ASPECT_NONE,
} VkImageAspectFlagBits;

* 
[VK_IMAGE_ASPECT_NONE](#VkImageAspectFlagBits) specifies no image aspect, or the image
aspect is not applicable.

* 
[VK_IMAGE_ASPECT_COLOR_BIT](#VkImageAspectFlagBits) specifies the color aspect.

* 
[VK_IMAGE_ASPECT_DEPTH_BIT](#VkImageAspectFlagBits) specifies the depth aspect.

* 
[VK_IMAGE_ASPECT_STENCIL_BIT](#VkImageAspectFlagBits) specifies the stencil aspect.

* 
[VK_IMAGE_ASPECT_METADATA_BIT](#VkImageAspectFlagBits) specifies the metadata aspect used
for [sparse resource](sparsemem.html#sparsememory) operations.

* 
[VK_IMAGE_ASPECT_PLANE_0_BIT](#VkImageAspectFlagBits) specifies plane 0 of a *multi-planar*
image format.

* 
[VK_IMAGE_ASPECT_PLANE_1_BIT](#VkImageAspectFlagBits) specifies plane 1 of a *multi-planar*
image format.

* 
[VK_IMAGE_ASPECT_PLANE_2_BIT](#VkImageAspectFlagBits) specifies plane 2 of a *multi-planar*
image format.

* 
[VK_IMAGE_ASPECT_MEMORY_PLANE_0_BIT_EXT](#VkImageAspectFlagBits) specifies *memory plane* 0.

* 
[VK_IMAGE_ASPECT_MEMORY_PLANE_1_BIT_EXT](#VkImageAspectFlagBits) specifies *memory plane* 1.

* 
[VK_IMAGE_ASPECT_MEMORY_PLANE_2_BIT_EXT](#VkImageAspectFlagBits) specifies *memory plane* 2.

* 
[VK_IMAGE_ASPECT_MEMORY_PLANE_3_BIT_EXT](#VkImageAspectFlagBits) specifies *memory plane* 3.

// Provided by VK_VERSION_1_0
typedef VkFlags VkImageAspectFlags;

`VkImageAspectFlags` is a bitmask type for setting a mask of zero or
more [VkImageAspectFlagBits](#VkImageAspectFlagBits).

The `VkComponentMapping` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkComponentMapping {
    VkComponentSwizzle    r;
    VkComponentSwizzle    g;
    VkComponentSwizzle    b;
    VkComponentSwizzle    a;
} VkComponentMapping;

* 
`r` is a [VkComponentSwizzle](#VkComponentSwizzle) specifying the component value
placed in the R component of the output vector.

* 
`g` is a [VkComponentSwizzle](#VkComponentSwizzle) specifying the component value
placed in the G component of the output vector.

* 
`b` is a [VkComponentSwizzle](#VkComponentSwizzle) specifying the component value
placed in the B component of the output vector.

* 
`a` is a [VkComponentSwizzle](#VkComponentSwizzle) specifying the component value
placed in the A component of the output vector.

Valid Usage (Implicit)

* 
[](#VUID-VkComponentMapping-r-parameter) VUID-VkComponentMapping-r-parameter

 `r` **must** be a valid [VkComponentSwizzle](#VkComponentSwizzle) value

* 
[](#VUID-VkComponentMapping-g-parameter) VUID-VkComponentMapping-g-parameter

 `g` **must** be a valid [VkComponentSwizzle](#VkComponentSwizzle) value

* 
[](#VUID-VkComponentMapping-b-parameter) VUID-VkComponentMapping-b-parameter

 `b` **must** be a valid [VkComponentSwizzle](#VkComponentSwizzle) value

* 
[](#VUID-VkComponentMapping-a-parameter) VUID-VkComponentMapping-a-parameter

 `a` **must** be a valid [VkComponentSwizzle](#VkComponentSwizzle) value

Possible values of the members of [VkComponentMapping](#VkComponentMapping), specifying the
component values placed in each component of the output vector, are:

// Provided by VK_VERSION_1_0
typedef enum VkComponentSwizzle {
    VK_COMPONENT_SWIZZLE_IDENTITY = 0,
    VK_COMPONENT_SWIZZLE_ZERO = 1,
    VK_COMPONENT_SWIZZLE_ONE = 2,
    VK_COMPONENT_SWIZZLE_R = 3,
    VK_COMPONENT_SWIZZLE_G = 4,
    VK_COMPONENT_SWIZZLE_B = 5,
    VK_COMPONENT_SWIZZLE_A = 6,
} VkComponentSwizzle;

* 
[VK_COMPONENT_SWIZZLE_IDENTITY](#VkComponentSwizzle) specifies that the component is set
to the identity swizzle.

* 
[VK_COMPONENT_SWIZZLE_ZERO](#VkComponentSwizzle) specifies that the component is set to
zero.

* 
[VK_COMPONENT_SWIZZLE_ONE](#VkComponentSwizzle) specifies that the component is set to
either 1 or 1.0, depending on whether the type of the image view format
is integer or floating-point respectively, as determined by the
[Format Definition](formats.html#formats-definition) section for each
[VkFormat](formats.html#VkFormat).

* 
[VK_COMPONENT_SWIZZLE_R](#VkComponentSwizzle) specifies that the component is set to the
value of the R component of the image.

* 
[VK_COMPONENT_SWIZZLE_G](#VkComponentSwizzle) specifies that the component is set to the
value of the G component of the image.

* 
[VK_COMPONENT_SWIZZLE_B](#VkComponentSwizzle) specifies that the component is set to the
value of the B component of the image.

* 
[VK_COMPONENT_SWIZZLE_A](#VkComponentSwizzle) specifies that the component is set to the
value of the A component of the image.

Setting the identity swizzle on a component is equivalent to setting the
identity mapping on that component.
That is:

| Component | Identity Mapping |
| --- | --- |
| `components.r` | [VK_COMPONENT_SWIZZLE_R](#VkComponentSwizzle) |
| `components.g` | [VK_COMPONENT_SWIZZLE_G](#VkComponentSwizzle) |
| `components.b` | [VK_COMPONENT_SWIZZLE_B](#VkComponentSwizzle) |
| `components.a` | [VK_COMPONENT_SWIZZLE_A](#VkComponentSwizzle) |

If the `pNext` chain includes a `VkImageViewASTCDecodeModeEXT`
structure, then that structure includes a parameter specifying the decode
mode for image views using ASTC compressed formats.

The `VkImageViewASTCDecodeModeEXT` structure is defined as:

// Provided by VK_EXT_astc_decode_mode
typedef struct VkImageViewASTCDecodeModeEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkFormat           decodeMode;
} VkImageViewASTCDecodeModeEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`decodeMode` is the intermediate format used to decode ASTC
compressed formats.

Valid Usage

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02230) VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02230

`decodeMode` **must** be one of [VK_FORMAT_R16G16B16A16_SFLOAT](formats.html#VkFormat),
[VK_FORMAT_R8G8B8A8_UNORM](formats.html#VkFormat), or
[VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](formats.html#VkFormat)

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02231) VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02231

If the [    `decodeModeSharedExponent`](features.html#features-astc-decodeModeSharedExponent) feature is not enabled,
`decodeMode` **must** not be [VK_FORMAT_E5B9G9R9_UFLOAT_PACK32](formats.html#VkFormat)

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02232) VUID-VkImageViewASTCDecodeModeEXT-decodeMode-02232

If `decodeMode` is [VK_FORMAT_R8G8B8A8_UNORM](formats.html#VkFormat) the image view
**must** not include blocks using any of the ASTC HDR modes

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-format-04084) VUID-VkImageViewASTCDecodeModeEXT-format-04084

`format` of the image view **must** be one of the
[ASTC Compressed Image Formats](../appendices/compressedtex.html#appendix-compressedtex-astc)

If `format` uses sRGB encoding then the `decodeMode` has no effect.

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-sType-sType) VUID-VkImageViewASTCDecodeModeEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_ASTC_DECODE_MODE_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageViewASTCDecodeModeEXT-decodeMode-parameter) VUID-VkImageViewASTCDecodeModeEXT-decodeMode-parameter

 `decodeMode` **must** be a valid [VkFormat](formats.html#VkFormat) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](#VkImageViewCreateInfo)

If the `pNext` chain includes a
`VkImageViewSampleWeightCreateInfoQCOM` structure, then that structure
includes a parameter specifying the parameters for weight image views used
in [weight image sampling](textures.html#textures-weightimage).

The `VkImageViewSampleWeightCreateInfoQCOM` structure is defined as:

// Provided by VK_QCOM_image_processing
typedef struct VkImageViewSampleWeightCreateInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
    VkOffset2D         filterCenter;
    VkExtent2D         filterSize;
    uint32_t           numPhases;
} VkImageViewSampleWeightCreateInfoQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`filterCenter` is a [VkOffset2D](fundamentals.html#VkOffset2D) describing the location of the
weight filter origin.

* 
`filterSize` is a [VkExtent2D](fundamentals.html#VkExtent2D) specifying weight filter
dimensions.

* 
`numPhases` is the number of sub-pixel filter phases.

The `filterCenter` specifies the origin or center of the filter kernel,
as described in [Weight Sampling Operation](textures.html#textures-weightimage-filteroperation).
The `numPhases` describes the number of sub-pixel filter phases as
described in [Weight Sampling Phases](textures.html#textures-weightimage-filterphases).

Valid Usage

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-filterSize-06958) VUID-VkImageViewSampleWeightCreateInfoQCOM-filterSize-06958

`filterSize.width` **must** be less than or equal to
[    `VkPhysicalDeviceImageProcessingPropertiesQCOM`::`maxWeightFilterDimension.width`](devsandqueues.html#limits-weightfilter-maxdimension)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-filterSize-06959) VUID-VkImageViewSampleWeightCreateInfoQCOM-filterSize-06959

`filterSize.height` **must** be less than or equal to
[    `VkPhysicalDeviceImageProcessingPropertiesQCOM`::`maxWeightFilterDimension.height`](devsandqueues.html#limits-weightfilter-maxdimension)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-filterCenter-06960) VUID-VkImageViewSampleWeightCreateInfoQCOM-filterCenter-06960

`filterCenter.x` **must** be less than or equal to
(filterSize.width - 1)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-filterCenter-06961) VUID-VkImageViewSampleWeightCreateInfoQCOM-filterCenter-06961

`filterCenter.y` **must** be less than or equal to
(filterSize.height - 1)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-numPhases-06962) VUID-VkImageViewSampleWeightCreateInfoQCOM-numPhases-06962

`numPhases` **must** be a power of two squared value (i.e., 1, 4, 16,
64, 256, etc.)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-numPhases-06963) VUID-VkImageViewSampleWeightCreateInfoQCOM-numPhases-06963

`numPhases` **must** be less than or equal to
[    `VkPhysicalDeviceImageProcessingPropertiesQCOM`::`maxWeightFilterPhases`](devsandqueues.html#limits-weightfilter-phases)

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewSampleWeightCreateInfoQCOM-sType-sType) VUID-VkImageViewSampleWeightCreateInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_SAMPLE_WEIGHT_CREATE_INFO_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](#VkImageViewCreateInfo)

To destroy an image view, call:

// Provided by VK_VERSION_1_0
void vkDestroyImageView(
    VkDevice                                    device,
    VkImageView                                 imageView,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the image view.

* 
`imageView` is the image view to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyImageView-imageView-01026) VUID-vkDestroyImageView-imageView-01026

All submitted commands that refer to `imageView` **must** have
completed execution

* 
[](#VUID-vkDestroyImageView-imageView-01027) VUID-vkDestroyImageView-imageView-01027

If `VkAllocationCallbacks` were provided when `imageView` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyImageView-imageView-01028) VUID-vkDestroyImageView-imageView-01028

If no `VkAllocationCallbacks` were provided when `imageView` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyImageView-device-parameter) VUID-vkDestroyImageView-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyImageView-imageView-parameter) VUID-vkDestroyImageView-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView` **must** be a valid [VkImageView](#VkImageView) handle

* 
[](#VUID-vkDestroyImageView-pAllocator-parameter) VUID-vkDestroyImageView-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyImageView-imageView-parent) VUID-vkDestroyImageView-imageView-parent

 If `imageView` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `imageView` **must** be externally synchronized

To get the handle for an image view, call:

// Provided by VK_NVX_image_view_handle
uint32_t vkGetImageViewHandleNVX(
    VkDevice                                    device,
    const VkImageViewHandleInfoNVX*             pInfo);

* 
`device` is the logical device that owns the image view.

* 
`pInfo` describes the image view to query and type of handle.

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageViewHandleNVX-device-parameter) VUID-vkGetImageViewHandleNVX-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageViewHandleNVX-pInfo-parameter) VUID-vkGetImageViewHandleNVX-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageViewHandleInfoNVX](#VkImageViewHandleInfoNVX) structure

To get the 64-bit handle for an image view, call:

// Provided by VK_NVX_image_view_handle
uint64_t vkGetImageViewHandle64NVX(
    VkDevice                                    device,
    const VkImageViewHandleInfoNVX*             pInfo);

* 
`device` is the logical device that owns the image view.

* 
`pInfo` describes the image view to query and type of handle.

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageViewHandle64NVX-device-parameter) VUID-vkGetImageViewHandle64NVX-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageViewHandle64NVX-pInfo-parameter) VUID-vkGetImageViewHandle64NVX-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageViewHandleInfoNVX](#VkImageViewHandleInfoNVX) structure

The `VkImageViewHandleInfoNVX` structure is defined as:

// Provided by VK_NVX_image_view_handle
typedef struct VkImageViewHandleInfoNVX {
    VkStructureType     sType;
    const void*         pNext;
    VkImageView         imageView;
    VkDescriptorType    descriptorType;
    VkSampler           sampler;
} VkImageViewHandleInfoNVX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the image view to query.

* 
`descriptorType` is the type of descriptor for which to query a
handle.

* 
`sampler` is the sampler to combine with the image view when
generating the handle.

Valid Usage

* 
[](#VUID-VkImageViewHandleInfoNVX-descriptorType-02654) VUID-VkImageViewHandleInfoNVX-descriptorType-02654

`descriptorType` **must** be [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType)

* 
[](#VUID-VkImageViewHandleInfoNVX-sampler-02655) VUID-VkImageViewHandleInfoNVX-sampler-02655

`sampler` **must** be a valid [VkSampler](samplers.html#VkSampler) if `descriptorType`
is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType)

* 
[](#VUID-VkImageViewHandleInfoNVX-imageView-02656) VUID-VkImageViewHandleInfoNVX-imageView-02656

If descriptorType is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptorsets.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptorsets.html#VkDescriptorType), the image that
`imageView` was created from **must** have been created with the
[VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits) usage flag set

* 
[](#VUID-VkImageViewHandleInfoNVX-imageView-02657) VUID-VkImageViewHandleInfoNVX-imageView-02657

If descriptorType is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptorsets.html#VkDescriptorType), the image
that `imageView` was created from **must** have been created with the
[VK_IMAGE_USAGE_STORAGE_BIT](#VkImageUsageFlagBits) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewHandleInfoNVX-sType-sType) VUID-VkImageViewHandleInfoNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_HANDLE_INFO_NVX](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageViewHandleInfoNVX-pNext-pNext) VUID-VkImageViewHandleInfoNVX-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageViewHandleInfoNVX-imageView-parameter) VUID-VkImageViewHandleInfoNVX-imageView-parameter

 `imageView` **must** be a valid [VkImageView](#VkImageView) handle

* 
[](#VUID-VkImageViewHandleInfoNVX-descriptorType-parameter) VUID-VkImageViewHandleInfoNVX-descriptorType-parameter

 `descriptorType` **must** be a valid [VkDescriptorType](descriptorsets.html#VkDescriptorType) value

* 
[](#VUID-VkImageViewHandleInfoNVX-sampler-parameter) VUID-VkImageViewHandleInfoNVX-sampler-parameter

 If `sampler` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `sampler` **must** be a valid [VkSampler](samplers.html#VkSampler) handle

* 
[](#VUID-VkImageViewHandleInfoNVX-commonparent) VUID-VkImageViewHandleInfoNVX-commonparent

 Both of `imageView`, and `sampler` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

To get the device address for an image view, call:

// Provided by VK_NVX_image_view_handle
VkResult vkGetImageViewAddressNVX(
    VkDevice                                    device,
    VkImageView                                 imageView,
    VkImageViewAddressPropertiesNVX*            pProperties);

* 
`device` is the logical device that owns the image view.

* 
`imageView` is a handle to the image view.

* 
`pProperties` contains the device address and size when the call
returns.

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageViewAddressNVX-device-parameter) VUID-vkGetImageViewAddressNVX-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageViewAddressNVX-imageView-parameter) VUID-vkGetImageViewAddressNVX-imageView-parameter

 `imageView` **must** be a valid [VkImageView](#VkImageView) handle

* 
[](#VUID-vkGetImageViewAddressNVX-pProperties-parameter) VUID-vkGetImageViewAddressNVX-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkImageViewAddressPropertiesNVX](#VkImageViewAddressPropertiesNVX) structure

* 
[](#VUID-vkGetImageViewAddressNVX-imageView-parent) VUID-vkGetImageViewAddressNVX-imageView-parent

 `imageView` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkImageViewAddressPropertiesNVX` structure is defined as:

// Provided by VK_NVX_image_view_handle
typedef struct VkImageViewAddressPropertiesNVX {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceAddress    deviceAddress;
    VkDeviceSize       size;
} VkImageViewAddressPropertiesNVX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceAddress` is the device address of the image view.

* 
`size` is the size in bytes of the image view device memory.

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewAddressPropertiesNVX-sType-sType) VUID-VkImageViewAddressPropertiesNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_ADDRESS_PROPERTIES_NVX](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageViewAddressPropertiesNVX-pNext-pNext) VUID-VkImageViewAddressPropertiesNVX-pNext-pNext

 `pNext` **must** be `NULL`

To get the handle for a combined image sampler, call:

// Provided by VK_NVX_image_view_handle
uint64_t vkGetDeviceCombinedImageSamplerIndexNVX(
    VkDevice                                    device,
    uint64_t                                    imageViewIndex,
    uint64_t                                    samplerIndex);

* 
`device` is the logical device that will use the result handle.

* 
`imageViewIndex` is the index within the resource heap.

* 
`samplerIndex` is the index within the sampler heap.

Shaders take `imageViewIndex` and `samplerIndex`, and multiply it by
[VkPhysicalDeviceDescriptorHeapPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorHeapPropertiesEXT)::`imageDescriptorSize`
and
[VkPhysicalDeviceDescriptorHeapPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorHeapPropertiesEXT)::`samplerDescriptorSize`
respectively to obtain the descriptor offset in bytes.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceCombinedImageSamplerIndexNVX-device-parameter) VUID-vkGetDeviceCombinedImageSamplerIndexNVX-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

Valid uses of a [VkImageView](#VkImageView) **may** depend on the image view’s *format
features*, defined below.
Such constraints are documented in the affected valid usage statement.

* 
If Vulkan 1.3 is supported or the `[VK_KHR_format_feature_flags2](../appendices/extensions.html#VK_KHR_format_feature_flags2)`
extension is supported, and [VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` was
created with [VK_IMAGE_TILING_LINEAR](#VkImageTiling), then the image view’s set of
*format features* is the value of
[VkFormatProperties3](formats.html#VkFormatProperties3)::`linearTilingFeatures` found by calling
[vkGetPhysicalDeviceFormatProperties2](formats.html#vkGetPhysicalDeviceFormatProperties2) on the same `format` as
[VkImageViewCreateInfo](#VkImageViewCreateInfo)::`format`.

* 
If Vulkan 1.3 is not supported and the
`[VK_KHR_format_feature_flags2](../appendices/extensions.html#VK_KHR_format_feature_flags2)` extension is not supported, and
[VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` was created with
[VK_IMAGE_TILING_LINEAR](#VkImageTiling), then the image view’s set of *format
features* is the union of the value of
[VkFormatProperties](formats.html#VkFormatProperties)::`linearTilingFeatures` found by calling
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) on the same `format` as
[VkImageViewCreateInfo](#VkImageViewCreateInfo)::`format`, with:

[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR) if the
format is a depth/stencil format and the image view features also
contain [VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits2KHR).

* 
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR) if the format
is one of the [extended storage     formats](formats.html#formats-without-shader-storage-format) and the [     `shaderStorageImageReadWithoutFormat`](features.html#features-shaderStorageImageReadWithoutFormat) feature is enabled.

* 
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR) if the
format is one of the [extended     storage formats](formats.html#formats-without-shader-storage-format) and the
[     `shaderStorageImageWriteWithoutFormat`](features.html#features-shaderStorageImageWriteWithoutFormat) feature is enabled.

If Vulkan 1.3 is supported or the `[VK_KHR_format_feature_flags2](../appendices/extensions.html#VK_KHR_format_feature_flags2)`
extension is supported, and [VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` was
created with [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling),
but without an
[Android    hardware buffer external format](memory.html#memory-external-android-hardware-buffer-external-formats),
or a [QNX Screen buffer    external format](memory.html#memory-external-screen-buffer-external-formats),
then the image view’s set of *format features* is the value of
[VkFormatProperties](formats.html#VkFormatProperties)::`optimalTilingFeatures` or
[VkFormatProperties3](formats.html#VkFormatProperties3)::`optimalTilingFeatures` found by calling
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) or
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) on the same `format`
as [VkImageViewCreateInfo](#VkImageViewCreateInfo)::`format`.

If Vulkan 1.3 is not supported and the
`[VK_KHR_format_feature_flags2](../appendices/extensions.html#VK_KHR_format_feature_flags2)` extension is not supported, and
[VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` was created with
[VK_IMAGE_TILING_OPTIMAL](#VkImageTiling),
but without an
[Android    hardware buffer external format](memory.html#memory-external-android-hardware-buffer-external-formats),
or a [QNX Screen buffer    external format](memory.html#memory-external-screen-buffer-external-formats),
then the image view’s set of *format features* is the union of the value
of [VkFormatProperties](formats.html#VkFormatProperties)::`optimalTilingFeatures` found by
calling [vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) on the same
`format` as [VkImageViewCreateInfo](#VkImageViewCreateInfo)::`format`, with:

* 
[VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_DEPTH_COMPARISON_BIT](formats.html#VkFormatFeatureFlagBits2KHR) if the
format is a depth/stencil format and the image view features also
contain [VK_FORMAT_FEATURE_2_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits2KHR).

* 
[VK_FORMAT_FEATURE_2_STORAGE_READ_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR) if the format
is one of the [extended storage     formats](formats.html#formats-without-shader-storage-format) and the [     `shaderStorageImageReadWithoutFormat`](features.html#features-shaderStorageImageReadWithoutFormat) feature is enabled.

* 
[VK_FORMAT_FEATURE_2_STORAGE_WRITE_WITHOUT_FORMAT_BIT](formats.html#VkFormatFeatureFlagBits2KHR) if the
format is one of the [extended     storage formats](formats.html#formats-without-shader-storage-format) and the
[     `shaderStorageImageWriteWithoutFormat`](features.html#features-shaderStorageImageWriteWithoutFormat) feature is enabled.

If [VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` was created with an
[Android    hardware buffer external format](memory.html#memory-external-android-hardware-buffer-external-formats), then the image views’s set of *format
features* is the value of
[VkAndroidHardwareBufferFormatPropertiesANDROID](memory.html#VkAndroidHardwareBufferFormatPropertiesANDROID)::`formatFeatures`
found by calling [vkGetAndroidHardwareBufferPropertiesANDROID](memory.html#vkGetAndroidHardwareBufferPropertiesANDROID) on
the Android hardware buffer that was imported to the
[VkDeviceMemory](memory.html#VkDeviceMemory) to which the
[VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` is bound.

If [VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` was created with a
[QNX Screen buffer    external format](memory.html#memory-external-screen-buffer-external-formats), then the image views’s set of *format features* is
the value of
[VkScreenBufferFormatPropertiesQNX](memory.html#VkScreenBufferFormatPropertiesQNX)::`formatFeatures` found by
calling [vkGetScreenBufferPropertiesQNX](memory.html#vkGetScreenBufferPropertiesQNX) on the QNX Screen buffer
that was imported to the [VkDeviceMemory](memory.html#VkDeviceMemory) to which the
[VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` is bound.

If [VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` was created with a chained
[VkBufferCollectionImageCreateInfoFUCHSIA](#VkBufferCollectionImageCreateInfoFUCHSIA), then the image view’s
set of *format features* is the value of
[VkBufferCollectionPropertiesFUCHSIA](#VkBufferCollectionPropertiesFUCHSIA)::`formatFeatures` found by
calling [vkGetBufferCollectionPropertiesFUCHSIA](#vkGetBufferCollectionPropertiesFUCHSIA) on the buffer
collection passed as
[VkBufferCollectionImageCreateInfoFUCHSIA](#VkBufferCollectionImageCreateInfoFUCHSIA)::`collection` when
the image was created.

If [VkImageViewCreateInfo](#VkImageViewCreateInfo)::`image` was created with
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then:

* 
The image’s DRM format modifier is the value of
[VkImageDrmFormatModifierPropertiesEXT](#VkImageDrmFormatModifierPropertiesEXT)::`drmFormatModifier`
found by calling [vkGetImageDrmFormatModifierPropertiesEXT](#vkGetImageDrmFormatModifierPropertiesEXT).

* 
Let
[VkDrmFormatModifierPropertiesListEXT](formats.html#VkDrmFormatModifierPropertiesListEXT)::`pDrmFormatModifierProperties`
be the array found by calling
[vkGetPhysicalDeviceFormatProperties2](formats.html#vkGetPhysicalDeviceFormatProperties2) on the same `format` as
[VkImageViewCreateInfo](#VkImageViewCreateInfo)::`format`.

* 
Let `VkDrmFormatModifierPropertiesEXT prop` be the array element whose
`drmFormatModifier` member is the value of the image’s DRM format
modifier.

* 
Then the image view’s set of *format features* is
`prop`::`drmFormatModifierTilingFeatures`.

The `VkImageViewMinLodCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_image_view_min_lod
typedef struct VkImageViewMinLodCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    float              minLod;
} VkImageViewMinLodCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`minLod` is the value to clamp the minimum LOD accessible by this
[VkImageView](#VkImageView).

If the `pNext` chain includes a `VkImageViewMinLodCreateInfoEXT`
structure, then that structure includes a parameter specifying a value to
clamp the minimum LOD value during [Image Level(s) Selection](textures.html#textures-image-level-selection), [Texel Gathering](textures.html#textures-gather) and
[Integer Texel Coordinate Operations](textures.html#textures-integer-coordinate-operations).

If the image view contains `VkImageViewMinLodCreateInfoEXT` and it is
used as part of a sampling operation:

minLodFloatimageView = `minLod`

otherwise:

minLodFloatimageView = 0.0

An integer variant of this parameter is also defined for sampling operations
which access integer mipmap levels:

minLodIntegerimageView = ⌊minLodFloatimageView⌋

Valid Usage

* 
[](#VUID-VkImageViewMinLodCreateInfoEXT-minLod-06455) VUID-VkImageViewMinLodCreateInfoEXT-minLod-06455

If the [`minLod`](features.html#features-minLod) feature is not enabled,
`minLod` **must** be `0.0`

* 
[](#VUID-VkImageViewMinLodCreateInfoEXT-minLod-06456) VUID-VkImageViewMinLodCreateInfoEXT-minLod-06456

`minLod` **must** be less or equal to the index of the last mipmap
level accessible to the view

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewMinLodCreateInfoEXT-sType-sType) VUID-VkImageViewMinLodCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_MIN_LOD_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageViewCreateInfo](#VkImageViewCreateInfo)

Acceleration structures are opaque data structures that are built by the
implementation to more efficiently perform spatial queries on the provided
geometric data.
For these extensions, an acceleration structure is either a top-level
acceleration structure containing a set of bottom-level acceleration
structures or a bottom-level acceleration structure containing either a set
of axis-aligned bounding boxes for custom geometry or a set of triangles.

Each instance in the top-level acceleration structure contains a reference
to a bottom-level acceleration structure as well as an instance transform
plus information required to index into the shader bindings.
The top-level acceleration structure is what is bound to the acceleration
descriptor, for example to trace inside the shader in the ray tracing
pipeline.

Acceleration structures for the `[VK_KHR_acceleration_structure](../appendices/extensions.html#VK_KHR_acceleration_structure)
extension` are represented by `VkAccelerationStructureKHR` handles:

// Provided by VK_KHR_acceleration_structure
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkAccelerationStructureKHR)

To create an acceleration structure using a device address, call:

// Provided by VK_KHR_acceleration_structure with VK_KHR_device_address_commands
VkResult vkCreateAccelerationStructure2KHR(
    VkDevice                                    device,
    const VkAccelerationStructureCreateInfo2KHR* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkAccelerationStructureKHR*                 pAccelerationStructure);

* 
`device` is the logical device that creates the acceleration
structure object.

* 
`pCreateInfo` is a pointer to a
[VkAccelerationStructureCreateInfo2KHR](#VkAccelerationStructureCreateInfo2KHR) structure containing
parameters affecting creation of the acceleration structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pAccelerationStructure` is a pointer to a
`VkAccelerationStructureKHR` handle in which the resulting
acceleration structure object is returned.

Similar to other objects in Vulkan, the acceleration structure creation
merely creates an object with a specific “shape”.
The type and quantity of geometry that can be built into an acceleration
structure is determined by the parameters of
[VkAccelerationStructureCreateInfo2KHR](#VkAccelerationStructureCreateInfo2KHR).

The acceleration structure data is stored in the object referred to by
`VkAccelerationStructureCreateInfo2KHR`::`addressRange.address`.

Once the `VkAccelerationStructureKHR` object has been created, it **must**
be populated by acceleration structure build or acceleration structure copy
commands such as [vkCmdBuildAccelerationStructuresKHR](accelstructures.html#vkCmdBuildAccelerationStructuresKHR) and
[vkCmdCopyAccelerationStructureKHR](accelstructures.html#vkCmdCopyAccelerationStructureKHR).
Acceleration structures created with this command **must** not be used by host
commands.

|  | The expected usage for a trace capture/replay tool is that it will serialize
| --- | --- |
and later deserialize the acceleration structure data using acceleration
structure copy commands.
During capture the tool will use
[vkCmdCopyAccelerationStructureToMemoryKHR](accelstructures.html#vkCmdCopyAccelerationStructureToMemoryKHR) with a `mode` of
[VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](accelstructures.html#VkCopyAccelerationStructureModeNV), and
[vkCmdCopyMemoryToAccelerationStructureKHR](accelstructures.html#vkCmdCopyMemoryToAccelerationStructureKHR) with a `mode` of
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](accelstructures.html#VkCopyAccelerationStructureModeNV) during replay. |

Valid Usage

* 
[](#VUID-vkCreateAccelerationStructure2KHR-accelerationStructure-03611) VUID-vkCreateAccelerationStructure2KHR-accelerationStructure-03611

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCreateAccelerationStructure2KHR-device-03489) VUID-vkCreateAccelerationStructure2KHR-device-03489

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkCreateAccelerationStructure2KHR-deviceAddressCommands-13086) VUID-vkCreateAccelerationStructure2KHR-deviceAddressCommands-13086

The [    `VkPhysicalDeviceDeviceAddressCommandsFeaturesKHR`::`deviceAddressCommands`](features.html#features-deviceAddressCommands)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateAccelerationStructure2KHR-device-parameter) VUID-vkCreateAccelerationStructure2KHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateAccelerationStructure2KHR-pCreateInfo-parameter) VUID-vkCreateAccelerationStructure2KHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkAccelerationStructureCreateInfo2KHR](#VkAccelerationStructureCreateInfo2KHR) structure

* 
[](#VUID-vkCreateAccelerationStructure2KHR-pAllocator-parameter) VUID-vkCreateAccelerationStructure2KHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateAccelerationStructure2KHR-pAccelerationStructure-parameter) VUID-vkCreateAccelerationStructure2KHR-pAccelerationStructure-parameter

 `pAccelerationStructure` **must** be a valid pointer to a [VkAccelerationStructureKHR](#VkAccelerationStructureKHR) handle

* 
[](#VUID-vkCreateAccelerationStructure2KHR-device-queuecount) VUID-vkCreateAccelerationStructure2KHR-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkAccelerationStructureCreateInfo2KHR` structure is defined as:

// Provided by VK_KHR_acceleration_structure with VK_KHR_device_address_commands
typedef struct VkAccelerationStructureCreateInfo2KHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkAccelerationStructureCreateFlagsKHR    createFlags;
    VkDeviceAddressRangeKHR                  addressRange;
    VkAddressCommandFlagsKHR                 addressFlags;
    VkAccelerationStructureTypeKHR           type;
} VkAccelerationStructureCreateInfo2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`createFlags` is a bitmask of
[VkAccelerationStructureCreateFlagBitsKHR](#VkAccelerationStructureCreateFlagBitsKHR) specifying additional
creation parameters of the acceleration structure.

* 
`addressRange` is a [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) structure defining
the size required for the acceleration structure and its starting
address.

* 
`addressFlags` is a [VkAddressCommandFlagsKHR](fundamentals.html#VkAddressCommandFlagsKHR) value defining
the flags for the address range.

* 
`type` is a [VkAccelerationStructureTypeKHR](#VkAccelerationStructureTypeKHR) value specifying
the type of acceleration structure that will be created.

Applications **should** create an acceleration structure with a specific
[VkAccelerationStructureTypeKHR](#VkAccelerationStructureTypeKHR) other than
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](#VkAccelerationStructureTypeNV).

|  | [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](#VkAccelerationStructureTypeNV) is intended to be used by
| --- | --- |
API translation layers.
This can be used at acceleration structure creation time in cases where the
actual acceleration structure type (top or bottom) is not yet known.
The actual acceleration structure type must be specified as
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](#VkAccelerationStructureTypeNV) or
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](#VkAccelerationStructureTypeNV) when the build is
performed. |

During replay, if `createFlags` includes
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](#VkAccelerationStructureCreateFlagBitsKHR),
`addressRange.address` **must** be an address used to create an identical
acceleration structure on the same implementation.
The address **must** be in the range of an identically created [VkBuffer](#VkBuffer)
at the same offset.

Applications **should** avoid creating acceleration structures with
application-provided addresses and implementation-provided addresses in the
same process, to reduce the likelihood of
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult) errors.

|  | The expected usage for this is that a trace capture/replay tool will add the
| --- | --- |
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits) flag and
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits) to all buffers used as
storage for an acceleration structure with
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](#VkAccelerationStructureCreateFlagBitsKHR)
included in `createFlags`.
This also means that the tool will need to add
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) to memory allocations to allow
the [VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits) flag to be set where the
application may not have otherwise required it.
During capture the tool will save the queried opaque device addresses in the
trace.
During replay, the buffers will be created specifying the original address
so any address values stored in the trace data will remain valid.

Implementations are expected to separate such buffers in the GPU address
space so normal allocations will avoid using these addresses.
Applications and tools should avoid mixing application-provided and
implementation-provided addresses for buffers created with
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits), to avoid address
space allocation conflicts. |

If the acceleration structure will be the target of a build operation, the
required size for an acceleration structure **can** be queried with
[vkGetAccelerationStructureBuildSizesKHR](#vkGetAccelerationStructureBuildSizesKHR).
If the acceleration structure is going to be the target of a copy,
[vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR) **can** be used to obtain
the size required depending on the type of copy.

If the acceleration structure will be the target of a build operation with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](#VkBuildAccelerationStructureFlagBitsNV) it **must** include
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](#VkAccelerationStructureCreateFlagBitsKHR) in `createFlags`
and include [VkAccelerationStructureMotionInfoNV](#VkAccelerationStructureMotionInfoNV) as an extension
structure in `pNext` with the number of instances as metadata for the
object.

Valid Usage

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13097) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13097

If the range specified by `addressRange` is not bound completely
to memory when accessed, `addressFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13098) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13098

If the buffer from which the range specified by `addressRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13099) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13099

If the buffer from which the range specified by `addressRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-13100) VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-13100

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13122) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](#VkBufferUsageFlagBits), `addressFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13123) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](#VkBufferUsageFlagBits), `addressFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-13101) VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-13101

`addressFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13124) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](#VkBufferUsageFlagBits),
`addressFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13125) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `addressRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](#VkBufferUsageFlagBits),
`addressFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11602) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11602

`addressRange.address` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11603) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11603

`addressRange` **must** specify a range within a valid address
retrieved from `buffer` that was created with a `usage` value
containing [VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](#VkBufferUsageFlagBits)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11604) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11604

`addressRange` **must** specify a range within a valid address
retrieved from `buffer` that was not created with a `flags`
value containing [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11605) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11605

`addressRange.address` **must** be a multiple of `256` bytes

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-11606) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-11606

If the `address` member of `addressRange` was retrieved from a
[VkBuffer](#VkBuffer) created with
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits),
`createFlags` **must** include
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](#VkAccelerationStructureCreateFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-11607) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-11607

If the `address` member of `addressRange` was retrieved from a
[VkBuffer](#VkBuffer) not created with
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits),
`createFlags` **must** not include
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](#VkAccelerationStructureCreateFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11608) VUID-VkAccelerationStructureCreateInfo2KHR-addressRange-11608

`addressRange.size` **must** be greater than zero

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-03613) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-03613

If `createFlags` includes
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](#VkAccelerationStructureCreateFlagBitsKHR),
[VkPhysicalDeviceAccelerationStructureFeaturesKHR](features.html#VkPhysicalDeviceAccelerationStructureFeaturesKHR)::`accelerationStructureCaptureReplay`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-04954) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-04954

If [VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](#VkAccelerationStructureCreateFlagBitsKHR) is set in
`createFlags` and `type` is
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](#VkAccelerationStructureTypeNV), one member of the
`pNext` chain **must** be a pointer to a valid instance of
[VkAccelerationStructureMotionInfoNV](#VkAccelerationStructureMotionInfoNV)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-04955) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-04955

If any geometry includes
`VkAccelerationStructureGeometryMotionTrianglesDataNV` then
`createFlags` **must** contain
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](#VkAccelerationStructureCreateFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-08108) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-08108

If `createFlags` includes
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkAccelerationStructureCreateFlagBitsKHR),
the [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-pNext-08109) VUID-VkAccelerationStructureCreateInfo2KHR-pNext-08109

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) structure,
`createFlags` **must** contain
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkAccelerationStructureCreateFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-sType-sType) VUID-VkAccelerationStructureCreateInfo2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_2_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-pNext-pNext) VUID-VkAccelerationStructureCreateInfo2KHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT)

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-sType-unique) VUID-VkAccelerationStructureCreateInfo2KHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-parameter) VUID-VkAccelerationStructureCreateInfo2KHR-createFlags-parameter

 `createFlags` **must** be a valid combination of [VkAccelerationStructureCreateFlagBitsKHR](#VkAccelerationStructureCreateFlagBitsKHR) values

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-parameter) VUID-VkAccelerationStructureCreateInfo2KHR-addressFlags-parameter

 `addressFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](fundamentals.html#VkAddressCommandFlagBitsKHR) values

* 
[](#VUID-VkAccelerationStructureCreateInfo2KHR-type-parameter) VUID-VkAccelerationStructureCreateInfo2KHR-type-parameter

 `type` **must** be a valid [VkAccelerationStructureTypeKHR](#VkAccelerationStructureTypeKHR) value

To create an acceleration structure using a buffer, call:

|  | This functionality is superseded by [vkCreateAccelerationStructure2KHR](#vkCreateAccelerationStructure2KHR). See [Legacy Functionality](../appendices/legacy.html#legacy-buffer-commands) for more information. |
| --- | --- |

// Provided by VK_KHR_acceleration_structure
VkResult vkCreateAccelerationStructureKHR(
    VkDevice                                    device,
    const VkAccelerationStructureCreateInfoKHR* pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkAccelerationStructureKHR*                 pAccelerationStructure);

* 
`device` is the logical device that creates the acceleration
structure object.

* 
`pCreateInfo` is a pointer to a
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR) structure containing
parameters affecting creation of the acceleration structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pAccelerationStructure` is a pointer to a
`VkAccelerationStructureKHR` handle in which the resulting
acceleration structure object is returned.

Similar to other objects in Vulkan, the acceleration structure creation
merely creates an object with a specific “shape”.
The type and quantity of geometry that can be built into an acceleration
structure is determined by the parameters of
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR).

The acceleration structure data is stored in the object referred to by
`VkAccelerationStructureCreateInfoKHR`::`buffer`.
Once memory has been bound to that buffer, it **must** be populated by
acceleration structure build or acceleration structure copy commands such as
[vkCmdBuildAccelerationStructuresKHR](accelstructures.html#vkCmdBuildAccelerationStructuresKHR),
[vkBuildAccelerationStructuresKHR](accelstructures.html#vkBuildAccelerationStructuresKHR),
[vkCmdCopyAccelerationStructureKHR](accelstructures.html#vkCmdCopyAccelerationStructureKHR), and
[vkCopyAccelerationStructureKHR](accelstructures.html#vkCopyAccelerationStructureKHR).

|  | The expected usage for a trace capture/replay tool is that it will serialize
| --- | --- |
and later deserialize the acceleration structure data using acceleration
structure copy commands.
During capture the tool will use
[vkCopyAccelerationStructureToMemoryKHR](accelstructures.html#vkCopyAccelerationStructureToMemoryKHR) or
[vkCmdCopyAccelerationStructureToMemoryKHR](accelstructures.html#vkCmdCopyAccelerationStructureToMemoryKHR) with a `mode` of
[VK_COPY_ACCELERATION_STRUCTURE_MODE_SERIALIZE_KHR](accelstructures.html#VkCopyAccelerationStructureModeNV), and
[vkCopyMemoryToAccelerationStructureKHR](accelstructures.html#vkCopyMemoryToAccelerationStructureKHR) or
[vkCmdCopyMemoryToAccelerationStructureKHR](accelstructures.html#vkCmdCopyMemoryToAccelerationStructureKHR) with a `mode` of
[VK_COPY_ACCELERATION_STRUCTURE_MODE_DESERIALIZE_KHR](accelstructures.html#VkCopyAccelerationStructureModeNV) during replay. |

|  | Memory does not need to be bound to the underlying buffer when
| --- | --- |
[vkCreateAccelerationStructureKHR](#vkCreateAccelerationStructureKHR) is called. |

The input buffers passed to acceleration structure build commands will be
referenced by the implementation for the duration of the command.
After the command completes, the acceleration structure **may** hold a
reference to any acceleration structure specified by an active instance
contained therein.
Apart from this referencing, acceleration structures **must** be fully
self-contained.
The application **can** reuse or free any memory which was used by the command
as an input or as scratch without affecting the results of ray traversal.

Valid Usage

* 
[](#VUID-vkCreateAccelerationStructureKHR-accelerationStructure-03611) VUID-vkCreateAccelerationStructureKHR-accelerationStructure-03611

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkCreateAccelerationStructureKHR-device-03489) VUID-vkCreateAccelerationStructureKHR-device-03489

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkCreateAccelerationStructureKHR-deviceAddress-03488) VUID-vkCreateAccelerationStructureKHR-deviceAddress-03488

If [VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR)::`deviceAddress` is
not zero, the [    `accelerationStructureCaptureReplay`](features.html#features-accelerationStructureCaptureReplay) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateAccelerationStructureKHR-device-parameter) VUID-vkCreateAccelerationStructureKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateAccelerationStructureKHR-pCreateInfo-parameter) VUID-vkCreateAccelerationStructureKHR-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR) structure

* 
[](#VUID-vkCreateAccelerationStructureKHR-pAllocator-parameter) VUID-vkCreateAccelerationStructureKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateAccelerationStructureKHR-pAccelerationStructure-parameter) VUID-vkCreateAccelerationStructureKHR-pAccelerationStructure-parameter

 `pAccelerationStructure` **must** be a valid pointer to a [VkAccelerationStructureKHR](#VkAccelerationStructureKHR) handle

* 
[](#VUID-vkCreateAccelerationStructureKHR-device-queuecount) VUID-vkCreateAccelerationStructureKHR-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkAccelerationStructureCreateInfoKHR` structure is defined as:

|  | This functionality is superseded by [VkAccelerationStructureCreateInfo2KHR](#VkAccelerationStructureCreateInfo2KHR). See [Legacy Functionality](../appendices/legacy.html#legacy-buffer-commands) for more information. |
| --- | --- |

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureCreateInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    VkAccelerationStructureCreateFlagsKHR    createFlags;
    VkBuffer                                 buffer;
    VkDeviceSize                             offset;
    VkDeviceSize                             size;
    VkAccelerationStructureTypeKHR           type;
    VkDeviceAddress                          deviceAddress;
} VkAccelerationStructureCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`createFlags` is a bitmask of
[VkAccelerationStructureCreateFlagBitsKHR](#VkAccelerationStructureCreateFlagBitsKHR) specifying additional
creation parameters of the acceleration structure.

* 
`buffer` is the buffer on which the acceleration structure will be
stored.

* 
`offset` is an offset in bytes from the base address of the buffer
at which the acceleration structure will be stored, and **must** be a
multiple of `256`.

* 
`size` is the size required for the acceleration structure.

* 
`type` is a [VkAccelerationStructureTypeKHR](#VkAccelerationStructureTypeKHR) value specifying
the type of acceleration structure that will be created.

* 
`deviceAddress` is the device address requested for the acceleration
structure, obtained from
[vkGetAccelerationStructureDeviceAddressKHR](#vkGetAccelerationStructureDeviceAddressKHR), if the
[    `accelerationStructureCaptureReplay`](features.html#features-accelerationStructureCaptureReplay) feature is being used.
If `deviceAddress` is zero, no specific address is requested.

Applications **should** avoid creating acceleration structures with
application-provided addresses and implementation-provided addresses in the
same process, to reduce the likelihood of
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult) errors.

|  | The expected usage for this is that a trace capture/replay tool will add the
| --- | --- |
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits) flag to all buffers
that use [VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits), and will add
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits) to all buffers used as
storage for an acceleration structure where `deviceAddress` is not zero.
This also means that the tool will need to add
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) to memory allocations to allow
the flag to be set where the application may not have otherwise required it.
During capture the tool will save the queried opaque device addresses in the
trace.
During replay, the buffers will be created specifying the original address
so any address values stored in the trace data will remain valid.

Implementations are expected to separate such buffers in the GPU address
space so normal allocations will avoid using these addresses.
Applications and tools should avoid mixing application-provided and
implementation-provided addresses for buffers created with
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits), to avoid address
space allocation conflicts. |

Applications **should** create an acceleration structure with a specific
[VkAccelerationStructureTypeKHR](#VkAccelerationStructureTypeKHR) other than
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](#VkAccelerationStructureTypeNV).

|  | [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](#VkAccelerationStructureTypeNV) is intended to be used by
| --- | --- |
API translation layers.
This can be used at acceleration structure creation time in cases where the
actual acceleration structure type (top or bottom) is not yet known.
The actual acceleration structure type must be specified as
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](#VkAccelerationStructureTypeNV) or
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](#VkAccelerationStructureTypeNV) when the build is
performed. |

If the acceleration structure will be the target of a build operation, the
required size for an acceleration structure **can** be queried with
[vkGetAccelerationStructureBuildSizesKHR](#vkGetAccelerationStructureBuildSizesKHR).
If the acceleration structure is going to be the target of a compacting
copy, [vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR) or
[vkWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkWriteAccelerationStructuresPropertiesKHR) **can** be used to obtain the
compacted size required.

If the acceleration structure will be the target of a build operation with
[VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV](#VkBuildAccelerationStructureFlagBitsNV) it **must** include
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](#VkAccelerationStructureCreateFlagBitsKHR) in `createFlags`
and include [VkAccelerationStructureMotionInfoNV](#VkAccelerationStructureMotionInfoNV) as an extension
structure in `pNext` with the number of instances as metadata for the
object.

Valid Usage

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-03612) VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-03612

If `deviceAddress` is not zero, `createFlags` **must** include
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](#VkAccelerationStructureCreateFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09488) VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09488

If `deviceAddress` is not zero, it **must** have been retrieved from an
identically created acceleration structure, except for `buffer` and
`deviceAddress`

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09489) VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09489

If `deviceAddress` is not zero, `buffer` **must** have been created
identically to the `buffer` used to create the acceleration
structure from which `deviceAddress` was retrieved, except for
[VkBufferOpaqueCaptureAddressCreateInfo](#VkBufferOpaqueCaptureAddressCreateInfo)::`opaqueCaptureAddress`

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09490) VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-09490

If `deviceAddress` is not zero, `buffer` **must** have been created
with a
[VkBufferOpaqueCaptureAddressCreateInfo](#VkBufferOpaqueCaptureAddressCreateInfo)::`opaqueCaptureAddress`
that was retrieved from [vkGetBufferOpaqueCaptureAddress](#vkGetBufferOpaqueCaptureAddress) for the
`buffer` that was used to create the acceleration structure from
which `deviceAddress` was retrieved

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-buffer-03614) VUID-VkAccelerationStructureCreateInfoKHR-buffer-03614

`buffer` **must** have been created with the
[VK_BUFFER_USAGE_ACCELERATION_STRUCTURE_STORAGE_BIT_KHR](#VkBufferUsageFlagBits) usage flag
set

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-buffer-03615) VUID-VkAccelerationStructureCreateInfoKHR-buffer-03615

`buffer` **must** not have been created with
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-offset-03616) VUID-VkAccelerationStructureCreateInfoKHR-offset-03616

The sum of `offset` and `size` **must** be less than or equal to
the size of `buffer`

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-offset-03734) VUID-VkAccelerationStructureCreateInfoKHR-offset-03734

`offset` **must** be a multiple of `256` bytes

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-createFlags-03613) VUID-VkAccelerationStructureCreateInfoKHR-createFlags-03613

If `createFlags` includes
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](#VkAccelerationStructureCreateFlagBitsKHR),
[VkPhysicalDeviceAccelerationStructureFeaturesKHR](features.html#VkPhysicalDeviceAccelerationStructureFeaturesKHR)::`accelerationStructureCaptureReplay`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-createFlags-04954) VUID-VkAccelerationStructureCreateInfoKHR-createFlags-04954

If [VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](#VkAccelerationStructureCreateFlagBitsKHR) is set in
`createFlags` and `type` is
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](#VkAccelerationStructureTypeNV), one member of the
`pNext` chain **must** be a pointer to a valid instance of
[VkAccelerationStructureMotionInfoNV](#VkAccelerationStructureMotionInfoNV)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-createFlags-04955) VUID-VkAccelerationStructureCreateInfoKHR-createFlags-04955

If any geometry includes
`VkAccelerationStructureGeometryMotionTrianglesDataNV` then
`createFlags` **must** contain
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](#VkAccelerationStructureCreateFlagBitsKHR)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-createFlags-08108) VUID-VkAccelerationStructureCreateInfoKHR-createFlags-08108

If `createFlags` includes
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkAccelerationStructureCreateFlagBitsKHR),
the [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-pNext-08109) VUID-VkAccelerationStructureCreateInfoKHR-pNext-08109

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) structure,
`createFlags` **must** contain
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkAccelerationStructureCreateFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-sType-sType) VUID-VkAccelerationStructureCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-pNext-pNext) VUID-VkAccelerationStructureCreateInfoKHR-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAccelerationStructureMotionInfoNV](#VkAccelerationStructureMotionInfoNV) or [VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT)

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-sType-unique) VUID-VkAccelerationStructureCreateInfoKHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-createFlags-parameter) VUID-VkAccelerationStructureCreateInfoKHR-createFlags-parameter

 `createFlags` **must** be a valid combination of [VkAccelerationStructureCreateFlagBitsKHR](#VkAccelerationStructureCreateFlagBitsKHR) values

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-buffer-parameter) VUID-VkAccelerationStructureCreateInfoKHR-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](#VkBuffer) handle

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-type-parameter) VUID-VkAccelerationStructureCreateInfoKHR-type-parameter

 `type` **must** be a valid [VkAccelerationStructureTypeKHR](#VkAccelerationStructureTypeKHR) value

* 
[](#VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-parameter) VUID-VkAccelerationStructureCreateInfoKHR-deviceAddress-parameter

 If `deviceAddress` is not `0`, `deviceAddress` **must** be a valid `VkDeviceAddress` value

The `VkAccelerationStructureMotionInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing_motion_blur
typedef struct VkAccelerationStructureMotionInfoNV {
    VkStructureType                             sType;
    const void*                                 pNext;
    uint32_t                                    maxInstances;
    VkAccelerationStructureMotionInfoFlagsNV    flags;
} VkAccelerationStructureMotionInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`maxInstances` is the maximum number of instances that **may** be used
in the motion top-level acceleration structure.

* 
`flags` is 0 and reserved for future use.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureMotionInfoNV-sType-sType) VUID-VkAccelerationStructureMotionInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_MOTION_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureMotionInfoNV-flags-zerobitmask) VUID-VkAccelerationStructureMotionInfoNV-flags-zerobitmask

 `flags` **must** be `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR)

// Provided by VK_NV_ray_tracing_motion_blur
typedef VkFlags VkAccelerationStructureMotionInfoFlagsNV;

`VkAccelerationStructureMotionInfoFlagsNV` is a bitmask type for setting
a mask, but is currently reserved for future use.

To get the build sizes for an acceleration structure, call:

// Provided by VK_KHR_acceleration_structure
void vkGetAccelerationStructureBuildSizesKHR(
    VkDevice                                    device,
    VkAccelerationStructureBuildTypeKHR         buildType,
    const VkAccelerationStructureBuildGeometryInfoKHR* pBuildInfo,
    const uint32_t*                             pMaxPrimitiveCounts,
    VkAccelerationStructureBuildSizesInfoKHR*   pSizeInfo);

* 
`device` is the logical device that will be used for creating the
acceleration structure.

* 
`buildType` defines whether host or device operations (or both) are
being queried for.

* 
`pBuildInfo` is a pointer to a
[VkAccelerationStructureBuildGeometryInfoKHR](accelstructures.html#VkAccelerationStructureBuildGeometryInfoKHR) structure describing
parameters of a build operation.

* 
`pMaxPrimitiveCounts` is a pointer to an array of
`pBuildInfo->geometryCount` `uint32_t` values defining the number
of primitives built into each geometry.

* 
`pSizeInfo` is a pointer to a
[VkAccelerationStructureBuildSizesInfoKHR](#VkAccelerationStructureBuildSizesInfoKHR) structure which returns
the size required for an acceleration structure and the sizes required
for the scratch buffers, given the build parameters.
The size requirements for a scratch buffer **may** be zero.

The `srcAccelerationStructure`, `dstAccelerationStructure`, and
`mode` members of `pBuildInfo` are ignored.
Any [VkDeviceOrHostAddressKHR](accelstructures.html#VkDeviceOrHostAddressKHR) or [VkDeviceOrHostAddressConstKHR](accelstructures.html#VkDeviceOrHostAddressConstKHR)
members of `pBuildInfo` are ignored by this command, except that the
`hostAddress` member of
[VkAccelerationStructureGeometryTrianglesDataKHR](accelstructures.html#VkAccelerationStructureGeometryTrianglesDataKHR)::`transformData`
will be examined to check if it is `NULL`.

An acceleration structure created with the `accelerationStructureSize`
returned by this command supports any build or update with a
[VkAccelerationStructureBuildGeometryInfoKHR](accelstructures.html#VkAccelerationStructureBuildGeometryInfoKHR) structure and array of
[VkAccelerationStructureBuildRangeInfoKHR](accelstructures.html#VkAccelerationStructureBuildRangeInfoKHR) structures subject to the
following properties:

* 
The build command is a host build command, and `buildType` is
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_KHR](#VkAccelerationStructureBuildTypeKHR) or
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR](#VkAccelerationStructureBuildTypeKHR)

* 
The build command is a device build command, and `buildType` is
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_DEVICE_KHR](#VkAccelerationStructureBuildTypeKHR) or
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR](#VkAccelerationStructureBuildTypeKHR)

* 
For [VkAccelerationStructureBuildGeometryInfoKHR](accelstructures.html#VkAccelerationStructureBuildGeometryInfoKHR):

Its `type`, and `flags` members are equal to
`pBuildInfo->type` and `pBuildInfo->flags`, respectively.

* 
`geometryCount` is less than or equal to
`pBuildInfo->geometryCount`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, its `geometryType` member is equal to
`pBuildInfo->geometryType`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, its `flags` member is equal to the corresponding
member of the same element in `pBuildInfo`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](#VkGeometryTypeNV), the `vertexFormat` and
`indexType` members of `geometry.triangles` are equal to the
corresponding members of the same element in `pBuildInfo`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](#VkGeometryTypeNV), the `maxVertex` member of
`geometry.triangles` is less than or equal to the corresponding
member of the same element in `pBuildInfo`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](#VkGeometryTypeNV), if the applicable address in the
`transformData` member of `geometry.triangles` is not `NULL`,
the corresponding `transformData.hostAddress` parameter in
`pBuildInfo` is not `NULL`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](#VkGeometryTypeNV), the
`numTriangles` member of the
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](accelstructures.html#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX)
structure in the `pNext` chain is less than or equal to the
corresponding member of the same element in `pBuildInfo`

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](#VkGeometryTypeNV), the
`numVertices` member of the
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](accelstructures.html#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX)
structure in the `pNext` chain is less than or equal to the
corresponding member of the same element in `pBuildInfo`

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](#VkGeometryTypeNV), the
`maxPrimitiveIndex` member of the
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](accelstructures.html#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX)
structure in the `pNext` chain is less than or equal to the
corresponding member of the same element in `pBuildInfo`

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](#VkGeometryTypeNV), the
`maxGeometryIndex` member of the
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](accelstructures.html#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX)
structure in the `pNext` chain is less than or equal to the
corresponding member of the same element in `pBuildInfo`

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](#VkGeometryTypeNV), the
`format` member of the
[VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX](accelstructures.html#VkAccelerationStructureDenseGeometryFormatTrianglesDataAMDX)
structure in the `pNext` chain is equal to the corresponding member
of the same element in `pBuildInfo`

For each [VkAccelerationStructureBuildRangeInfoKHR](accelstructures.html#VkAccelerationStructureBuildRangeInfoKHR) corresponding to
the [VkAccelerationStructureBuildGeometryInfoKHR](accelstructures.html#VkAccelerationStructureBuildGeometryInfoKHR):

* 
Its `primitiveCount` member is less than or equal to the
corresponding element of `pMaxPrimitiveCounts`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](#VkGeometryTypeNV), if the `pNext` chain contains
[VkAccelerationStructureTrianglesOpacityMicromapEXT](accelstructures.html#VkAccelerationStructureTrianglesOpacityMicromapEXT) the
corresponding member of `pBuildInfo` also contains
[VkAccelerationStructureTrianglesOpacityMicromapEXT](accelstructures.html#VkAccelerationStructureTrianglesOpacityMicromapEXT) and with an
equivalent `micromap`.

* 
For each element of either `pGeometries` or `ppGeometries` at a
given index, with a `geometryType` member equal to
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](#VkGeometryTypeNV), if the `pNext` chain contains
[VkAccelerationStructureTrianglesDisplacementMicromapNV](accelstructures.html#VkAccelerationStructureTrianglesDisplacementMicromapNV) the
corresponding member of `pBuildInfo` also contains
[VkAccelerationStructureTrianglesDisplacementMicromapNV](accelstructures.html#VkAccelerationStructureTrianglesDisplacementMicromapNV) and with
an equivalent `micromap`.

For each [VkAccelerationStructureBuildRangeInfoKHR](accelstructures.html#VkAccelerationStructureBuildRangeInfoKHR) corresponding to
the [VkAccelerationStructureBuildGeometryInfoKHR](accelstructures.html#VkAccelerationStructureBuildGeometryInfoKHR):

* 
Its `primitiveCount` member is less than or equal to the
corresponding element of `pMaxPrimitiveCounts`.

Similarly, the `updateScratchSize` value will support any build command
specifying the [VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](accelstructures.html#VkBuildAccelerationStructureModeKHR)
`mode` under the above conditions, and the `buildScratchSize` value
will support any build command specifying the
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_BUILD_KHR](accelstructures.html#VkBuildAccelerationStructureModeKHR) `mode` under the
above conditions.

Valid Usage

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-accelerationStructure-08933) VUID-vkGetAccelerationStructureBuildSizesKHR-accelerationStructure-08933

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-device-03618) VUID-vkGetAccelerationStructureBuildSizesKHR-device-03618

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-03619) VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-03619

If `pBuildInfo->geometryCount` is not `0`, `pMaxPrimitiveCounts`
**must** be a valid pointer to an array of `pBuildInfo->geometryCount`
`uint32_t` values

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-03785) VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-03785

If `pBuildInfo->pGeometries` or `pBuildInfo->ppGeometries` has a
`geometryType` of [VK_GEOMETRY_TYPE_INSTANCES_KHR](#VkGeometryTypeNV), each
`pMaxPrimitiveCounts`[i] **must** be less than or equal to
[VkPhysicalDeviceAccelerationStructurePropertiesKHR](limits.html#VkPhysicalDeviceAccelerationStructurePropertiesKHR)::`maxInstanceCount`

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-device-parameter) VUID-vkGetAccelerationStructureBuildSizesKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-buildType-parameter) VUID-vkGetAccelerationStructureBuildSizesKHR-buildType-parameter

 `buildType` **must** be a valid [VkAccelerationStructureBuildTypeKHR](#VkAccelerationStructureBuildTypeKHR) value

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-parameter) VUID-vkGetAccelerationStructureBuildSizesKHR-pBuildInfo-parameter

 `pBuildInfo` **must** be a valid pointer to a valid [VkAccelerationStructureBuildGeometryInfoKHR](accelstructures.html#VkAccelerationStructureBuildGeometryInfoKHR) structure

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-pMaxPrimitiveCounts-parameter) VUID-vkGetAccelerationStructureBuildSizesKHR-pMaxPrimitiveCounts-parameter

 If `pMaxPrimitiveCounts` is not `NULL`, `pMaxPrimitiveCounts` **must** be a valid pointer to an array of `pBuildInfo->geometryCount` `uint32_t` values

* 
[](#VUID-vkGetAccelerationStructureBuildSizesKHR-pSizeInfo-parameter) VUID-vkGetAccelerationStructureBuildSizesKHR-pSizeInfo-parameter

 `pSizeInfo` **must** be a valid pointer to a [VkAccelerationStructureBuildSizesInfoKHR](#VkAccelerationStructureBuildSizesInfoKHR) structure

The `VkAccelerationStructureBuildSizesInfoKHR` structure describes the
required build sizes for an acceleration structure and scratch buffers and
is defined as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureBuildSizesInfoKHR {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       accelerationStructureSize;
    VkDeviceSize       updateScratchSize;
    VkDeviceSize       buildScratchSize;
} VkAccelerationStructureBuildSizesInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructureSize` is the size in bytes required in a
[VkAccelerationStructureKHR](#VkAccelerationStructureKHR) for a build or update operation.

* 
`updateScratchSize` is the size in bytes required in a scratch
buffer for an update operation.

* 
`buildScratchSize` is the size in bytes required in a scratch buffer
for a build operation.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureBuildSizesInfoKHR-sType-sType) VUID-VkAccelerationStructureBuildSizesInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_SIZES_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureBuildSizesInfoKHR-pNext-pNext) VUID-VkAccelerationStructureBuildSizesInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

Acceleration structures for the `[VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension` are
represented by the similar `VkAccelerationStructureNV` handles:

// Provided by VK_NV_ray_tracing
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkAccelerationStructureNV)

To create acceleration structures, call:

// Provided by VK_NV_ray_tracing
VkResult vkCreateAccelerationStructureNV(
    VkDevice                                    device,
    const VkAccelerationStructureCreateInfoNV*  pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkAccelerationStructureNV*                  pAccelerationStructure);

* 
`device` is the logical device that creates the buffer object.

* 
`pCreateInfo` is a pointer to a
[VkAccelerationStructureCreateInfoNV](#VkAccelerationStructureCreateInfoNV) structure containing
parameters affecting creation of the acceleration structure.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pAccelerationStructure` is a pointer to a
[VkAccelerationStructureNV](#VkAccelerationStructureNV) handle in which the resulting
acceleration structure object is returned.

Similarly to other objects in Vulkan, the acceleration structure creation
merely creates an object with a specific “shape” as specified by the
information in [VkAccelerationStructureInfoNV](#VkAccelerationStructureInfoNV) and `compactedSize`
in `pCreateInfo`.

Once memory has been bound to the acceleration structure using
[vkBindAccelerationStructureMemoryNV](#vkBindAccelerationStructureMemoryNV), that memory is populated by calls
to [vkCmdBuildAccelerationStructureNV](accelstructures.html#vkCmdBuildAccelerationStructureNV) and
[vkCmdCopyAccelerationStructureNV](accelstructures.html#vkCmdCopyAccelerationStructureNV).

Acceleration structure creation uses the count and type information from the
geometries, but does not use the data references in the structures.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateAccelerationStructureNV-device-parameter) VUID-vkCreateAccelerationStructureNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateAccelerationStructureNV-pCreateInfo-parameter) VUID-vkCreateAccelerationStructureNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkAccelerationStructureCreateInfoNV](#VkAccelerationStructureCreateInfoNV) structure

* 
[](#VUID-vkCreateAccelerationStructureNV-pAllocator-parameter) VUID-vkCreateAccelerationStructureNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateAccelerationStructureNV-pAccelerationStructure-parameter) VUID-vkCreateAccelerationStructureNV-pAccelerationStructure-parameter

 `pAccelerationStructure` **must** be a valid pointer to a [VkAccelerationStructureNV](#VkAccelerationStructureNV) handle

* 
[](#VUID-vkCreateAccelerationStructureNV-device-queuecount) VUID-vkCreateAccelerationStructureNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkAccelerationStructureCreateInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkAccelerationStructureCreateInfoNV {
    VkStructureType                  sType;
    const void*                      pNext;
    VkDeviceSize                     compactedSize;
    VkAccelerationStructureInfoNV    info;
} VkAccelerationStructureCreateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`compactedSize` is the size from the result of
[vkCmdWriteAccelerationStructuresPropertiesNV](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesNV) if this acceleration
structure is going to be the target of a compacting copy.

* 
`info` is the [VkAccelerationStructureInfoNV](#VkAccelerationStructureInfoNV) structure
specifying further parameters of the created acceleration structure.

Valid Usage

* 
[](#VUID-VkAccelerationStructureCreateInfoNV-compactedSize-02421) VUID-VkAccelerationStructureCreateInfoNV-compactedSize-02421

If `compactedSize` is not `0` then both `info.geometryCount` and
`info.instanceCount` **must** be `0`

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureCreateInfoNV-sType-sType) VUID-VkAccelerationStructureCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureCreateInfoNV-pNext-pNext) VUID-VkAccelerationStructureCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT)

* 
[](#VUID-VkAccelerationStructureCreateInfoNV-sType-unique) VUID-VkAccelerationStructureCreateInfoNV-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAccelerationStructureCreateInfoNV-info-parameter) VUID-VkAccelerationStructureCreateInfoNV-info-parameter

 `info` **must** be a valid [VkAccelerationStructureInfoNV](#VkAccelerationStructureInfoNV) structure

The `VkAccelerationStructureInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkAccelerationStructureInfoNV {
    VkStructureType                        sType;
    const void*                            pNext;
    VkAccelerationStructureTypeNV          type;
    VkBuildAccelerationStructureFlagsNV    flags;
    uint32_t                               instanceCount;
    uint32_t                               geometryCount;
    const VkGeometryNV*                    pGeometries;
} VkAccelerationStructureInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is a [VkAccelerationStructureTypeNV](#VkAccelerationStructureTypeNV) value specifying the
type of acceleration structure that will be created.

* 
`flags` is a bitmask of [VkBuildAccelerationStructureFlagBitsNV](#VkBuildAccelerationStructureFlagBitsNV)
specifying additional parameters of the acceleration structure.

* 
`instanceCount` specifies the number of instances that will be in
the new acceleration structure.

* 
`geometryCount` specifies the number of geometries that will be in
the new acceleration structure.

* 
`pGeometries` is a pointer to an array of `geometryCount`
[VkGeometryNV](#VkGeometryNV) structures containing the scene data being passed
into the acceleration structure.

`VkAccelerationStructureInfoNV` contains information that is used both
for acceleration structure creation with
[vkCreateAccelerationStructureNV](#vkCreateAccelerationStructureNV) and in combination with the actual
geometric data to build the acceleration structure with
[vkCmdBuildAccelerationStructureNV](accelstructures.html#vkCmdBuildAccelerationStructureNV).

Valid Usage

* 
[](#VUID-VkAccelerationStructureInfoNV-geometryCount-02422) VUID-VkAccelerationStructureInfoNV-geometryCount-02422

`geometryCount` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPropertiesNV](limits.html#VkPhysicalDeviceRayTracingPropertiesNV)::`maxGeometryCount`

* 
[](#VUID-VkAccelerationStructureInfoNV-instanceCount-02423) VUID-VkAccelerationStructureInfoNV-instanceCount-02423

`instanceCount` **must** be less than or equal to
[VkPhysicalDeviceRayTracingPropertiesNV](limits.html#VkPhysicalDeviceRayTracingPropertiesNV)::`maxInstanceCount`

* 
[](#VUID-VkAccelerationStructureInfoNV-maxTriangleCount-02424) VUID-VkAccelerationStructureInfoNV-maxTriangleCount-02424

The total number of triangles in all geometries **must** be less than or
equal to
[VkPhysicalDeviceRayTracingPropertiesNV](limits.html#VkPhysicalDeviceRayTracingPropertiesNV)::`maxTriangleCount`

* 
[](#VUID-VkAccelerationStructureInfoNV-type-02425) VUID-VkAccelerationStructureInfoNV-type-02425

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_NV](#VkAccelerationStructureTypeNV) then
`geometryCount` **must** be `0`

* 
[](#VUID-VkAccelerationStructureInfoNV-type-02426) VUID-VkAccelerationStructureInfoNV-type-02426

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_NV](#VkAccelerationStructureTypeNV)
then `instanceCount` **must** be `0`

* 
[](#VUID-VkAccelerationStructureInfoNV-type-02786) VUID-VkAccelerationStructureInfoNV-type-02786

If `type` is [VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_NV](#VkAccelerationStructureTypeNV)
then the `geometryType` member of each geometry in `pGeometries`
**must** be the same

* 
[](#VUID-VkAccelerationStructureInfoNV-type-04623) VUID-VkAccelerationStructureInfoNV-type-04623

`type` **must** not be [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](#VkAccelerationStructureTypeNV)

* 
[](#VUID-VkAccelerationStructureInfoNV-flags-02592) VUID-VkAccelerationStructureInfoNV-flags-02592

If `flags` has the
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_NV](#VkBuildAccelerationStructureFlagBitsNV) bit set,
then it **must** not have the
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_NV](#VkBuildAccelerationStructureFlagBitsNV) bit set

* 
[](#VUID-VkAccelerationStructureInfoNV-scratch-02781) VUID-VkAccelerationStructureInfoNV-scratch-02781

`scratch` **must** have been created with the
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkAccelerationStructureInfoNV-instanceData-02782) VUID-VkAccelerationStructureInfoNV-instanceData-02782

If `instanceData` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `instanceData`
**must** have been created with the
[VK_BUFFER_USAGE_RAY_TRACING_BIT_NV](#VkBufferUsageFlagBits) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureInfoNV-sType-sType) VUID-VkAccelerationStructureInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureInfoNV-pNext-pNext) VUID-VkAccelerationStructureInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureInfoNV-type-parameter) VUID-VkAccelerationStructureInfoNV-type-parameter

 `type` **must** be a valid [VkAccelerationStructureTypeNV](#VkAccelerationStructureTypeNV) value

* 
[](#VUID-VkAccelerationStructureInfoNV-flags-parameter) VUID-VkAccelerationStructureInfoNV-flags-parameter

 `flags` **must** be a valid combination of [VkBuildAccelerationStructureFlagBitsNV](#VkBuildAccelerationStructureFlagBitsNV) values

* 
[](#VUID-VkAccelerationStructureInfoNV-pGeometries-parameter) VUID-VkAccelerationStructureInfoNV-pGeometries-parameter

 If `geometryCount` is not `0`, `pGeometries` **must** be a valid pointer to an array of `geometryCount` valid [VkGeometryNV](#VkGeometryNV) structures

Values which **can** be set in
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR)::`type`
or
[VkAccelerationStructureInfoNV](#VkAccelerationStructureInfoNV)::`type`
specifying the type of acceleration structure, are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkAccelerationStructureTypeKHR {
    VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR = 0,
    VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR = 1,
    VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR = 2,
  // Provided by VK_NV_ray_tracing
    VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_NV = VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR,
  // Provided by VK_NV_ray_tracing
    VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_NV = VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR,
} VkAccelerationStructureTypeKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkAccelerationStructureTypeKHR
typedef VkAccelerationStructureTypeKHR VkAccelerationStructureTypeNV;

* 
[VK_ACCELERATION_STRUCTURE_TYPE_TOP_LEVEL_KHR](#VkAccelerationStructureTypeNV) is a top-level
acceleration structure containing instance data referring to
bottom-level acceleration structures.

* 
[VK_ACCELERATION_STRUCTURE_TYPE_BOTTOM_LEVEL_KHR](#VkAccelerationStructureTypeNV) is a bottom-level
acceleration structure containing the AABBs or geometry to be
intersected.

* 
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](#VkAccelerationStructureTypeNV) is an acceleration
structure whose type is determined at build time used for special
circumstances.
In these cases, the acceleration structure type is not known at creation
time, but **must** be specified at build time as either top or bottom.

Bits which **can** be set in
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR)::`createFlags`, specifying
additional creation parameters for acceleration structures, are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkAccelerationStructureCreateFlagBitsKHR {
    VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR = 0x00000001,
  // Provided by VK_EXT_descriptor_buffer
    VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT = 0x00000008,
  // Provided by VK_NV_ray_tracing_motion_blur
    VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV = 0x00000004,
} VkAccelerationStructureCreateFlagBitsKHR;

* 
[VK_ACCELERATION_STRUCTURE_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR](#VkAccelerationStructureCreateFlagBitsKHR)
specifies that the acceleration structure’s address **can** be saved and
reused on a subsequent run.

* 
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkAccelerationStructureCreateFlagBitsKHR)
specifies that the acceleration structure **can** be used with descriptor
buffers when capturing and replaying (e.g. for trace capture and
replay), see [VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) for more
detail.

* 
[VK_ACCELERATION_STRUCTURE_CREATE_MOTION_BIT_NV](#VkAccelerationStructureCreateFlagBitsKHR) specifies that the
acceleration structure will be used with motion information, see
[VkAccelerationStructureMotionInfoNV](#VkAccelerationStructureMotionInfoNV) for more detail.

// Provided by VK_KHR_acceleration_structure
typedef VkFlags VkAccelerationStructureCreateFlagsKHR;

`VkAccelerationStructureCreateFlagsKHR` is a bitmask type for setting a
mask of zero or more [VkAccelerationStructureCreateFlagBitsKHR](#VkAccelerationStructureCreateFlagBitsKHR).

Bits which **can** be set in
[VkAccelerationStructureBuildGeometryInfoKHR](accelstructures.html#VkAccelerationStructureBuildGeometryInfoKHR)::`flags`
or
[VkAccelerationStructureInfoNV](#VkAccelerationStructureInfoNV)::`flags`
specifying additional parameters for acceleration structure builds, are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkBuildAccelerationStructureFlagBitsKHR {
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR = 0x00000001,
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR = 0x00000002,
    VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR = 0x00000004,
    VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR = 0x00000008,
    VK_BUILD_ACCELERATION_STRUCTURE_LOW_MEMORY_BIT_KHR = 0x00000010,
  // Provided by VK_NV_ray_tracing_motion_blur
    VK_BUILD_ACCELERATION_STRUCTURE_MOTION_BIT_NV = 0x00000020,
  // Provided by VK_EXT_opacity_micromap
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT = 0x00000040,
  // Provided by VK_EXT_opacity_micromap
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_opacity_micromap
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT = 0x00000100,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_displacement_micromap
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_BIT_NV = 0x00000200,
#endif
  // Provided by VK_KHR_ray_tracing_position_fetch
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR = 0x00000800,
  // Provided by VK_NV_cluster_acceleration_structure
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_CLUSTER_OPACITY_MICROMAPS_BIT_NV = 0x00001000,
  // Provided by VK_NV_ray_tracing
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_NV = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_NV = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_NV = VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_NV = VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_BUILD_ACCELERATION_STRUCTURE_LOW_MEMORY_BIT_NV = VK_BUILD_ACCELERATION_STRUCTURE_LOW_MEMORY_BIT_KHR,
  // Provided by VK_EXT_opacity_micromap
  // VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_EXT is a legacy alias
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_EXT = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT,
  // Provided by VK_EXT_opacity_micromap
  // VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_EXT is a legacy alias
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_EXT = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_EXT,
  // Provided by VK_EXT_opacity_micromap
  // VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_EXT is a legacy alias
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_EXT = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_displacement_micromap
  // VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_NV is a legacy alias
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_NV = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_BIT_NV,
#endif
  // Provided by VK_KHR_ray_tracing_position_fetch
  // VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_KHR is a legacy alias
    VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_KHR = VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR,
} VkBuildAccelerationStructureFlagBitsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkBuildAccelerationStructureFlagBitsKHR
typedef VkBuildAccelerationStructureFlagBitsKHR VkBuildAccelerationStructureFlagBitsNV;

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](#VkBuildAccelerationStructureFlagBitsNV) specifies
    that the specified acceleration structure **can** be updated with
    a `mode` of [VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](accelstructures.html#VkBuildAccelerationStructureModeKHR) in
    [VkAccelerationStructureBuildGeometryInfoKHR](accelstructures.html#VkAccelerationStructureBuildGeometryInfoKHR)
or
    an `update` of [VK_TRUE](fundamentals.html#VK_TRUE) in
    [vkCmdBuildAccelerationStructureNV](accelstructures.html#vkCmdBuildAccelerationStructureNV)
    .
    For sphere and LSS primitives, only positions and radii may be updated,
    the provided index buffers and flags **must** remain unchanged from the
    initial build.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](#VkBuildAccelerationStructureFlagBitsNV) specifies
that the specified acceleration structure **can** act as the source for a
copy acceleration structure command with `mode` of
[VK_COPY_ACCELERATION_STRUCTURE_MODE_COMPACT_KHR](accelstructures.html#VkCopyAccelerationStructureModeNV) to produce a
compacted acceleration structure.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_TRACE_BIT_KHR](#VkBuildAccelerationStructureFlagBitsNV)
specifies that the given acceleration structure build **should** prioritize
trace performance over build time.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_PREFER_FAST_BUILD_BIT_KHR](#VkBuildAccelerationStructureFlagBitsNV)
specifies that the given acceleration structure build **should** prioritize
build time over trace performance.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_LOW_MEMORY_BIT_KHR](#VkBuildAccelerationStructureFlagBitsNV) specifies that
this acceleration structure **should** minimize the size of the scratch
memory and the final result acceleration structure, potentially at the
expense of build time or trace performance.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_UPDATE_BIT_EXT](#VkBuildAccelerationStructureFlagBitsNV)
specifies that the opacity micromaps associated with the specified
acceleration structure **may** change with an acceleration structure
update.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_OPACITY_MICROMAP_DATA_UPDATE_BIT_EXT](#VkBuildAccelerationStructureFlagBitsNV)
specifies that the data of the opacity micromaps associated with the
specified acceleration structure **may** change with an acceleration
structure update.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISABLE_OPACITY_MICROMAPS_BIT_EXT](#VkBuildAccelerationStructureFlagBitsNV)
specifies that the specified acceleration structure **may** be referenced
in an instance with
[VK_GEOMETRY_INSTANCE_DISABLE_OPACITY_MICROMAPS_BIT_EXT](accelstructures.html#VkGeometryInstanceFlagBitsNV) set.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_CLUSTER_OPACITY_MICROMAPS_BIT_NV](#VkBuildAccelerationStructureFlagBitsNV)
specifies that opacity micromaps **may** be associated with the given
cluster acceleration structure.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DATA_ACCESS_BIT_KHR](#VkBuildAccelerationStructureFlagBitsNV)
specifies that the specified acceleration structure **can** be used when
fetching the
vertex and radius positions of a hit LSS or sphere primitive, or
vertex positions of a hit triangle.

* 
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_DISPLACEMENT_MICROMAP_UPDATE_BIT_NV](#VkBuildAccelerationStructureFlagBitsNV)
specifies that the displacement micromaps associated with the specified
acceleration structure **may** change with an acceleration structure
update.

|  | [VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](#VkBuildAccelerationStructureFlagBitsNV) and
| --- | --- |
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](#VkBuildAccelerationStructureFlagBitsNV) **may** take
more time and memory than a normal build, and so **should** only be used when
those features are needed. |

|  | [VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_UPDATE_BIT_KHR](#VkBuildAccelerationStructureFlagBitsNV) and
| --- | --- |
[VK_BUILD_ACCELERATION_STRUCTURE_ALLOW_COMPACTION_BIT_KHR](#VkBuildAccelerationStructureFlagBitsNV) are allowed
to be used together.
In that case, the result of the compaction copy is used as the source of a
build with `mode` of
[VK_BUILD_ACCELERATION_STRUCTURE_MODE_UPDATE_KHR](accelstructures.html#VkBuildAccelerationStructureModeKHR) to perform the
compacted update. |

// Provided by VK_KHR_acceleration_structure
typedef VkFlags VkBuildAccelerationStructureFlagsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkBuildAccelerationStructureFlagsKHR
typedef VkBuildAccelerationStructureFlagsKHR VkBuildAccelerationStructureFlagsNV;

`VkBuildAccelerationStructureFlagsKHR` is a bitmask type for setting a
mask of zero or more [VkBuildAccelerationStructureFlagBitsKHR](#VkBuildAccelerationStructureFlagBitsKHR).

The `VkGeometryNV` structure describes geometry in a bottom-level
acceleration structure and is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkGeometryNV {
    VkStructureType       sType;
    const void*           pNext;
    VkGeometryTypeKHR     geometryType;
    VkGeometryDataNV      geometry;
    VkGeometryFlagsKHR    flags;
} VkGeometryNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`geometryType` specifies the [VkGeometryTypeKHR](#VkGeometryTypeKHR) which this
geometry refers to.

* 
`geometry` contains the geometry data as described in
[VkGeometryDataNV](#VkGeometryDataNV).

* 
`flags` has [VkGeometryFlagBitsKHR](#VkGeometryFlagBitsKHR) describing options for this
geometry.

Valid Usage

* 
[](#VUID-VkGeometryNV-geometryType-03503) VUID-VkGeometryNV-geometryType-03503

`geometryType` **must** be [VK_GEOMETRY_TYPE_TRIANGLES_NV](#VkGeometryTypeNV) or
[VK_GEOMETRY_TYPE_AABBS_NV](#VkGeometryTypeNV)

Valid Usage (Implicit)

* 
[](#VUID-VkGeometryNV-sType-sType) VUID-VkGeometryNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GEOMETRY_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGeometryNV-pNext-pNext) VUID-VkGeometryNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGeometryNV-geometryType-parameter) VUID-VkGeometryNV-geometryType-parameter

 `geometryType` **must** be a valid [VkGeometryTypeKHR](#VkGeometryTypeKHR) value

* 
[](#VUID-VkGeometryNV-geometry-parameter) VUID-VkGeometryNV-geometry-parameter

 `geometry` **must** be a valid [VkGeometryDataNV](#VkGeometryDataNV) structure

* 
[](#VUID-VkGeometryNV-flags-parameter) VUID-VkGeometryNV-flags-parameter

 `flags` **must** be a valid combination of [VkGeometryFlagBitsKHR](#VkGeometryFlagBitsKHR) values

Geometry types are specified by [VkGeometryTypeKHR](#VkGeometryTypeKHR), which takes values:

// Provided by VK_KHR_acceleration_structure
typedef enum VkGeometryTypeKHR {
    VK_GEOMETRY_TYPE_TRIANGLES_KHR = 0,
    VK_GEOMETRY_TYPE_AABBS_KHR = 1,
    VK_GEOMETRY_TYPE_INSTANCES_KHR = 2,
  // Provided by VK_NV_ray_tracing_linear_swept_spheres
    VK_GEOMETRY_TYPE_SPHERES_NV = 1000429004,
  // Provided by VK_NV_ray_tracing_linear_swept_spheres
    VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV = 1000429005,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_dense_geometry_format
    VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX = 1000478000,
#endif
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_TYPE_TRIANGLES_NV = VK_GEOMETRY_TYPE_TRIANGLES_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_TYPE_AABBS_NV = VK_GEOMETRY_TYPE_AABBS_KHR,
} VkGeometryTypeKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkGeometryTypeKHR
typedef VkGeometryTypeKHR VkGeometryTypeNV;

* 
[VK_GEOMETRY_TYPE_TRIANGLES_KHR](#VkGeometryTypeNV) specifies a geometry type
consisting of [triangles](accelstructures.html#ray-tracing-triangle-primitive).

* 
[VK_GEOMETRY_TYPE_AABBS_KHR](#VkGeometryTypeNV) specifies a geometry type consisting of
[axis-aligned bounding boxes](accelstructures.html#aabb-primitive).

* 
[VK_GEOMETRY_TYPE_INSTANCES_KHR](#VkGeometryTypeNV) specifies a geometry type
consisting of acceleration structure instances.

* 
[VK_GEOMETRY_TYPE_DENSE_GEOMETRY_FORMAT_TRIANGLES_AMDX](#VkGeometryTypeNV) specifies a
geometry type consisting of triangles from compressed data.

* 
[VK_GEOMETRY_TYPE_SPHERES_NV](#VkGeometryTypeNV) specifies a geometry type consisting
of [spheres](accelstructures.html#sphere-primitive).

* 
[VK_GEOMETRY_TYPE_LINEAR_SWEPT_SPHERES_NV](#VkGeometryTypeNV) specifies a geometry type
consisting of [linear swept spheres](accelstructures.html#linear-swept-sphere-primitive).

Bits specifying additional parameters for geometries in acceleration
structure builds, are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkGeometryFlagBitsKHR {
    VK_GEOMETRY_OPAQUE_BIT_KHR = 0x00000001,
    VK_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION_BIT_KHR = 0x00000002,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_OPAQUE_BIT_NV = VK_GEOMETRY_OPAQUE_BIT_KHR,
  // Provided by VK_NV_ray_tracing
    VK_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION_BIT_NV = VK_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION_BIT_KHR,
} VkGeometryFlagBitsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkGeometryFlagBitsKHR
typedef VkGeometryFlagBitsKHR VkGeometryFlagBitsNV;

* 
[VK_GEOMETRY_OPAQUE_BIT_KHR](#VkGeometryFlagBitsNV) specifies that this geometry does not
invoke the any-hit shaders even if present in a hit group.

* 
[VK_GEOMETRY_NO_DUPLICATE_ANY_HIT_INVOCATION_BIT_KHR](#VkGeometryFlagBitsNV) specifies that
the implementation **must** only call the any-hit shader a single time for
each primitive in this geometry.
If this bit is absent an implementation **may** invoke the any-hit shader
more than once for this geometry.

// Provided by VK_KHR_acceleration_structure
typedef VkFlags VkGeometryFlagsKHR;

// Provided by VK_NV_ray_tracing
// Equivalent to VkGeometryFlagsKHR
typedef VkGeometryFlagsKHR VkGeometryFlagsNV;

`VkGeometryFlagsKHR` is a bitmask type for setting a mask of zero or
more [VkGeometryFlagBitsKHR](#VkGeometryFlagBitsKHR).

The `VkGeometryDataNV` structure specifies geometry in a bottom-level
acceleration structure and is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkGeometryDataNV {
    VkGeometryTrianglesNV    triangles;
    VkGeometryAABBNV         aabbs;
} VkGeometryDataNV;

* 
`triangles` contains triangle data if
[VkGeometryNV](#VkGeometryNV)::`geometryType` is
[VK_GEOMETRY_TYPE_TRIANGLES_NV](#VkGeometryTypeNV).

* 
`aabbs` contains axis-aligned bounding box data if
[VkGeometryNV](#VkGeometryNV)::`geometryType` is
[VK_GEOMETRY_TYPE_AABBS_NV](#VkGeometryTypeNV).

Valid Usage (Implicit)

* 
[](#VUID-VkGeometryDataNV-triangles-parameter) VUID-VkGeometryDataNV-triangles-parameter

 `triangles` **must** be a valid [VkGeometryTrianglesNV](#VkGeometryTrianglesNV) structure

* 
[](#VUID-VkGeometryDataNV-aabbs-parameter) VUID-VkGeometryDataNV-aabbs-parameter

 `aabbs` **must** be a valid [VkGeometryAABBNV](#VkGeometryAABBNV) structure

The `VkGeometryTrianglesNV` structure specifies triangle geometry in a
bottom-level acceleration structure and is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkGeometryTrianglesNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           vertexData;
    VkDeviceSize       vertexOffset;
    uint32_t           vertexCount;
    VkDeviceSize       vertexStride;
    VkFormat           vertexFormat;
    VkBuffer           indexData;
    VkDeviceSize       indexOffset;
    uint32_t           indexCount;
    VkIndexType        indexType;
    VkBuffer           transformData;
    VkDeviceSize       transformOffset;
} VkGeometryTrianglesNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`vertexData` is the buffer containing vertex data for this geometry.

* 
`vertexOffset` is the offset in bytes within `vertexData`
containing vertex data for this geometry.

* 
`vertexCount` is the number of valid vertices.

* 
`vertexStride` is the stride in bytes between each vertex.

* 
`vertexFormat` is a [VkFormat](formats.html#VkFormat) describing the format of each
vertex element.

* 
`indexData` is the buffer containing index data for this geometry.

* 
`indexOffset` is the offset in bytes within `indexData`
containing index data for this geometry.

* 
`indexCount` is the number of indices to include in this geometry.

* 
`indexType` is a [VkIndexType](drawing.html#VkIndexType) describing the format of each
index.

* 
`transformData` is an optional buffer containing an
[VkTransformMatrixNV](accelstructures.html#VkTransformMatrixNV) structure defining a transformation to be
applied to this geometry.

* 
`transformOffset` is the offset in bytes in `transformData` of
the transform information described above.

If `indexType` is [VK_INDEX_TYPE_NONE_NV](drawing.html#VkIndexType), then this structure
describes a set of triangles determined by `vertexCount`.
Otherwise, this structure describes a set of indexed triangles determined by
`indexCount`.

Valid Usage

* 
[](#VUID-VkGeometryTrianglesNV-vertexOffset-02428) VUID-VkGeometryTrianglesNV-vertexOffset-02428

`vertexOffset` **must** be less than the size of `vertexData`

* 
[](#VUID-VkGeometryTrianglesNV-vertexOffset-02429) VUID-VkGeometryTrianglesNV-vertexOffset-02429

`vertexOffset` **must** be a multiple of the component size of
`vertexFormat`

* 
[](#VUID-VkGeometryTrianglesNV-vertexFormat-02430) VUID-VkGeometryTrianglesNV-vertexFormat-02430

`vertexFormat` **must** be one of [VK_FORMAT_R32G32B32_SFLOAT](formats.html#VkFormat),
[VK_FORMAT_R32G32_SFLOAT](formats.html#VkFormat), [VK_FORMAT_R16G16B16_SFLOAT](formats.html#VkFormat),
[VK_FORMAT_R16G16_SFLOAT](formats.html#VkFormat), [VK_FORMAT_R16G16_SNORM](formats.html#VkFormat), or
[VK_FORMAT_R16G16B16_SNORM](formats.html#VkFormat)

* 
[](#VUID-VkGeometryTrianglesNV-vertexStride-03818) VUID-VkGeometryTrianglesNV-vertexStride-03818

`vertexStride` **must** be less than or equal to 232-1

* 
[](#VUID-VkGeometryTrianglesNV-indexOffset-02431) VUID-VkGeometryTrianglesNV-indexOffset-02431

`indexOffset` **must** be less than the size of `indexData`

* 
[](#VUID-VkGeometryTrianglesNV-indexOffset-02432) VUID-VkGeometryTrianglesNV-indexOffset-02432

`indexOffset` **must** be a multiple of the element size of
`indexType`

* 
[](#VUID-VkGeometryTrianglesNV-indexType-02433) VUID-VkGeometryTrianglesNV-indexType-02433

`indexType` **must** be [VK_INDEX_TYPE_UINT16](drawing.html#VkIndexType),
[VK_INDEX_TYPE_UINT32](drawing.html#VkIndexType), or [VK_INDEX_TYPE_NONE_NV](drawing.html#VkIndexType)

* 
[](#VUID-VkGeometryTrianglesNV-indexData-02434) VUID-VkGeometryTrianglesNV-indexData-02434

`indexData` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) if `indexType` is
[VK_INDEX_TYPE_NONE_NV](drawing.html#VkIndexType)

* 
[](#VUID-VkGeometryTrianglesNV-indexData-02435) VUID-VkGeometryTrianglesNV-indexData-02435

`indexData` **must** be a valid `VkBuffer` handle if
`indexType` is not [VK_INDEX_TYPE_NONE_NV](drawing.html#VkIndexType)

* 
[](#VUID-VkGeometryTrianglesNV-indexCount-02436) VUID-VkGeometryTrianglesNV-indexCount-02436

`indexCount` **must** be `0` if `indexType` is
[VK_INDEX_TYPE_NONE_NV](drawing.html#VkIndexType)

* 
[](#VUID-VkGeometryTrianglesNV-transformOffset-02437) VUID-VkGeometryTrianglesNV-transformOffset-02437

`transformOffset` **must** be less than the size of `transformData`

* 
[](#VUID-VkGeometryTrianglesNV-transformOffset-02438) VUID-VkGeometryTrianglesNV-transformOffset-02438

`transformOffset` **must** be a multiple of `16`

Valid Usage (Implicit)

* 
[](#VUID-VkGeometryTrianglesNV-sType-sType) VUID-VkGeometryTrianglesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GEOMETRY_TRIANGLES_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGeometryTrianglesNV-pNext-pNext) VUID-VkGeometryTrianglesNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGeometryTrianglesNV-vertexData-parameter) VUID-VkGeometryTrianglesNV-vertexData-parameter

 If `vertexData` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `vertexData` **must** be a valid [VkBuffer](#VkBuffer) handle

* 
[](#VUID-VkGeometryTrianglesNV-vertexFormat-parameter) VUID-VkGeometryTrianglesNV-vertexFormat-parameter

 `vertexFormat` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkGeometryTrianglesNV-indexData-parameter) VUID-VkGeometryTrianglesNV-indexData-parameter

 If `indexData` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `indexData` **must** be a valid [VkBuffer](#VkBuffer) handle

* 
[](#VUID-VkGeometryTrianglesNV-indexType-parameter) VUID-VkGeometryTrianglesNV-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](drawing.html#VkIndexType) value

* 
[](#VUID-VkGeometryTrianglesNV-transformData-parameter) VUID-VkGeometryTrianglesNV-transformData-parameter

 If `transformData` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `transformData` **must** be a valid [VkBuffer](#VkBuffer) handle

* 
[](#VUID-VkGeometryTrianglesNV-commonparent) VUID-VkGeometryTrianglesNV-commonparent

 Each of `indexData`, `transformData`, and `vertexData` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

The `VkGeometryAABBNV` structure specifies axis-aligned bounding box
geometry in a bottom-level acceleration structure, and is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkGeometryAABBNV {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           aabbData;
    uint32_t           numAABBs;
    uint32_t           stride;
    VkDeviceSize       offset;
} VkGeometryAABBNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`aabbData` is the buffer containing axis-aligned bounding box data.

* 
`numAABBs` is the number of AABBs in this geometry.

* 
`stride` is the stride in bytes between AABBs in `aabbData`.

* 
`offset` is the offset in bytes of the first AABB in `aabbData`.

The AABB data in memory is six 32-bit floats consisting of the minimum x, y,
and z values followed by the maximum x, y, and z values.

Valid Usage

* 
[](#VUID-VkGeometryAABBNV-offset-02439) VUID-VkGeometryAABBNV-offset-02439

`offset` **must** be less than the size of `aabbData`

* 
[](#VUID-VkGeometryAABBNV-offset-02440) VUID-VkGeometryAABBNV-offset-02440

`offset` **must** be a multiple of `8`

* 
[](#VUID-VkGeometryAABBNV-stride-02441) VUID-VkGeometryAABBNV-stride-02441

`stride` **must** be a multiple of `8`

Valid Usage (Implicit)

* 
[](#VUID-VkGeometryAABBNV-sType-sType) VUID-VkGeometryAABBNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_GEOMETRY_AABB_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkGeometryAABBNV-pNext-pNext) VUID-VkGeometryAABBNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkGeometryAABBNV-aabbData-parameter) VUID-VkGeometryAABBNV-aabbData-parameter

 If `aabbData` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `aabbData` **must** be a valid [VkBuffer](#VkBuffer) handle

To destroy an acceleration structure, call:

// Provided by VK_KHR_acceleration_structure
void vkDestroyAccelerationStructureKHR(
    VkDevice                                    device,
    VkAccelerationStructureKHR                  accelerationStructure,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the acceleration
structure.

* 
`accelerationStructure` is the acceleration structure to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-08934) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-08934

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02442) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02442

All submitted commands that refer to `accelerationStructure` **must**
have completed execution

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02443) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02443

If `VkAllocationCallbacks` were provided when
`accelerationStructure` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02444) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-02444

If no `VkAllocationCallbacks` were provided when
`accelerationStructure` was created, `pAllocator` **must** be
`NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyAccelerationStructureKHR-device-parameter) VUID-vkDestroyAccelerationStructureKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-parameter) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-parameter

 If `accelerationStructure` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `accelerationStructure` **must** be a valid [VkAccelerationStructureKHR](#VkAccelerationStructureKHR) handle

* 
[](#VUID-vkDestroyAccelerationStructureKHR-pAllocator-parameter) VUID-vkDestroyAccelerationStructureKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-parent) VUID-vkDestroyAccelerationStructureKHR-accelerationStructure-parent

 If `accelerationStructure` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `accelerationStructure` **must** be externally synchronized

To destroy an acceleration structure, call:

// Provided by VK_NV_ray_tracing
void vkDestroyAccelerationStructureNV(
    VkDevice                                    device,
    VkAccelerationStructureNV                   accelerationStructure,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the buffer.

* 
`accelerationStructure` is the acceleration structure to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03752) VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03752

All submitted commands that refer to `accelerationStructure` **must**
have completed execution

* 
[](#VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03753) VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03753

If `VkAllocationCallbacks` were provided when
`accelerationStructure` was created, a compatible set of callbacks
**must** be provided here

* 
[](#VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03754) VUID-vkDestroyAccelerationStructureNV-accelerationStructure-03754

If no `VkAllocationCallbacks` were provided when
`accelerationStructure` was created, `pAllocator` **must** be
`NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyAccelerationStructureNV-device-parameter) VUID-vkDestroyAccelerationStructureNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyAccelerationStructureNV-accelerationStructure-parameter) VUID-vkDestroyAccelerationStructureNV-accelerationStructure-parameter

 If `accelerationStructure` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `accelerationStructure` **must** be a valid [VkAccelerationStructureNV](#VkAccelerationStructureNV) handle

* 
[](#VUID-vkDestroyAccelerationStructureNV-pAllocator-parameter) VUID-vkDestroyAccelerationStructureNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyAccelerationStructureNV-accelerationStructure-parent) VUID-vkDestroyAccelerationStructureNV-accelerationStructure-parent

 If `accelerationStructure` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `accelerationStructure` **must** be externally synchronized

An acceleration structure has memory requirements for the structure object
itself, scratch space for the build, and scratch space for the update.

Scratch space is allocated as a `VkBuffer`, so for
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_BUILD_SCRATCH_NV](#VkAccelerationStructureMemoryRequirementsTypeNV)
and
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_UPDATE_SCRATCH_NV](#VkAccelerationStructureMemoryRequirementsTypeNV)
the `pMemoryRequirements->alignment` and
`pMemoryRequirements->memoryTypeBits` values returned by this call **must**
be filled with zero, and **should** be ignored by the application.

To query the memory requirements, call:

// Provided by VK_NV_ray_tracing
void vkGetAccelerationStructureMemoryRequirementsNV(
    VkDevice                                    device,
    const VkAccelerationStructureMemoryRequirementsInfoNV* pInfo,
    VkMemoryRequirements2KHR*                   pMemoryRequirements);

* 
`device` is the logical device on which the acceleration structure
was created.

* 
`pInfo` is a pointer to a
[VkAccelerationStructureMemoryRequirementsInfoNV](#VkAccelerationStructureMemoryRequirementsInfoNV) structure
specifying the acceleration structure to get memory requirements for.

* 
`pMemoryRequirements` is a pointer to a
[VkMemoryRequirements2KHR](#VkMemoryRequirements2KHR) structure in which the requested
acceleration structure memory requirements are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureMemoryRequirementsNV-device-parameter) VUID-vkGetAccelerationStructureMemoryRequirementsNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetAccelerationStructureMemoryRequirementsNV-pInfo-parameter) VUID-vkGetAccelerationStructureMemoryRequirementsNV-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAccelerationStructureMemoryRequirementsInfoNV](#VkAccelerationStructureMemoryRequirementsInfoNV) structure

* 
[](#VUID-vkGetAccelerationStructureMemoryRequirementsNV-pMemoryRequirements-parameter) VUID-vkGetAccelerationStructureMemoryRequirementsNV-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2KHR](#VkMemoryRequirements2KHR) structure

The `VkAccelerationStructureMemoryRequirementsInfoNV` structure is
defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkAccelerationStructureMemoryRequirementsInfoNV {
    VkStructureType                                    sType;
    const void*                                        pNext;
    VkAccelerationStructureMemoryRequirementsTypeNV    type;
    VkAccelerationStructureNV                          accelerationStructure;
} VkAccelerationStructureMemoryRequirementsInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` selects the type of memory requirement being queried.
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV](#VkAccelerationStructureMemoryRequirementsTypeNV)
returns the memory requirements for the object itself.
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_BUILD_SCRATCH_NV](#VkAccelerationStructureMemoryRequirementsTypeNV)
returns the memory requirements for the scratch memory when doing a
build.
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_UPDATE_SCRATCH_NV](#VkAccelerationStructureMemoryRequirementsTypeNV)
returns the memory requirements for the scratch memory when doing an
update.

* 
`accelerationStructure` is the acceleration structure to be queried
for memory requirements.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureMemoryRequirementsInfoNV-sType-sType) VUID-VkAccelerationStructureMemoryRequirementsInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureMemoryRequirementsInfoNV-pNext-pNext) VUID-VkAccelerationStructureMemoryRequirementsInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureMemoryRequirementsInfoNV-type-parameter) VUID-VkAccelerationStructureMemoryRequirementsInfoNV-type-parameter

 `type` **must** be a valid [VkAccelerationStructureMemoryRequirementsTypeNV](#VkAccelerationStructureMemoryRequirementsTypeNV) value

* 
[](#VUID-VkAccelerationStructureMemoryRequirementsInfoNV-accelerationStructure-parameter) VUID-VkAccelerationStructureMemoryRequirementsInfoNV-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid [VkAccelerationStructureNV](#VkAccelerationStructureNV) handle

Possible values of `type` in
`VkAccelerationStructureMemoryRequirementsInfoNV` are:,

// Provided by VK_NV_ray_tracing
typedef enum VkAccelerationStructureMemoryRequirementsTypeNV {
    VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV = 0,
    VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_BUILD_SCRATCH_NV = 1,
    VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_UPDATE_SCRATCH_NV = 2,
} VkAccelerationStructureMemoryRequirementsTypeNV;

* 
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV](#VkAccelerationStructureMemoryRequirementsTypeNV)
requests the memory requirement for the `VkAccelerationStructureNV`
backing store.

* 
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_BUILD_SCRATCH_NV](#VkAccelerationStructureMemoryRequirementsTypeNV)
requests the memory requirement for scratch space during the initial
build.

* 
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_UPDATE_SCRATCH_NV](#VkAccelerationStructureMemoryRequirementsTypeNV)
requests the memory requirement for scratch space during an update.

Possible values of `buildType` in
[vkGetAccelerationStructureBuildSizesKHR](#vkGetAccelerationStructureBuildSizesKHR) are:

// Provided by VK_KHR_acceleration_structure
typedef enum VkAccelerationStructureBuildTypeKHR {
    VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_KHR = 0,
    VK_ACCELERATION_STRUCTURE_BUILD_TYPE_DEVICE_KHR = 1,
    VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR = 2,
} VkAccelerationStructureBuildTypeKHR;

* 
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_KHR](#VkAccelerationStructureBuildTypeKHR) requests the memory
requirement for operations performed by the host.

* 
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_DEVICE_KHR](#VkAccelerationStructureBuildTypeKHR) requests the
memory requirement for operations performed by the device.

* 
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR](#VkAccelerationStructureBuildTypeKHR) requests
the memory requirement for operations performed by either the host, or
the device.

To attach memory to one or more acceleration structures at a time, call:

// Provided by VK_NV_ray_tracing
VkResult vkBindAccelerationStructureMemoryNV(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindAccelerationStructureMemoryInfoNV* pBindInfos);

* 
`device` is the logical device that owns the acceleration structures
and memory.

* 
`bindInfoCount` is the number of elements in `pBindInfos`.

* 
`pBindInfos` is a pointer to an array of
[VkBindAccelerationStructureMemoryInfoNV](#VkBindAccelerationStructureMemoryInfoNV) structures describing
acceleration structures and memory to bind.

Valid Usage (Implicit)

* 
[](#VUID-vkBindAccelerationStructureMemoryNV-device-parameter) VUID-vkBindAccelerationStructureMemoryNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkBindAccelerationStructureMemoryNV-pBindInfos-parameter) VUID-vkBindAccelerationStructureMemoryNV-pBindInfos-parameter

 `pBindInfos` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindAccelerationStructureMemoryInfoNV](#VkBindAccelerationStructureMemoryInfoNV) structures

* 
[](#VUID-vkBindAccelerationStructureMemoryNV-bindInfoCount-arraylength) VUID-vkBindAccelerationStructureMemoryNV-bindInfoCount-arraylength

 `bindInfoCount` **must** be greater than `0`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkBindAccelerationStructureMemoryInfoNV` structure is defined as:

// Provided by VK_NV_ray_tracing
typedef struct VkBindAccelerationStructureMemoryInfoNV {
    VkStructureType              sType;
    const void*                  pNext;
    VkAccelerationStructureNV    accelerationStructure;
    VkDeviceMemory               memory;
    VkDeviceSize                 memoryOffset;
    uint32_t                     deviceIndexCount;
    const uint32_t*              pDeviceIndices;
} VkBindAccelerationStructureMemoryInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructure` is the acceleration structure to be attached
to memory.

* 
`memory` is a `VkDeviceMemory` object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of memory that is
to be bound to the acceleration structure.
The number of bytes returned in the
[VkMemoryRequirements](#VkMemoryRequirements)::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified
acceleration structure.

* 
`deviceIndexCount` is the number of elements in
`pDeviceIndices`.

* 
`pDeviceIndices` is a pointer to an array of device indices.

Valid Usage

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-accelerationStructure-03620) VUID-VkBindAccelerationStructureMemoryInfoNV-accelerationStructure-03620

`accelerationStructure` **must** not already be backed by a memory
object

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-memoryOffset-03621) VUID-VkBindAccelerationStructureMemoryInfoNV-memoryOffset-03621

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-memory-03622) VUID-VkBindAccelerationStructureMemoryInfoNV-memory-03622

`memory` **must** have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
[VkMemoryRequirements](#VkMemoryRequirements) structure returned from a call to
[vkGetAccelerationStructureMemoryRequirementsNV](#vkGetAccelerationStructureMemoryRequirementsNV) with
`accelerationStructure` and `type` of
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV](#VkAccelerationStructureMemoryRequirementsTypeNV)

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-memoryOffset-03623) VUID-VkBindAccelerationStructureMemoryInfoNV-memoryOffset-03623

`memoryOffset` **must** be an integer multiple of the `alignment`
member of the [VkMemoryRequirements](#VkMemoryRequirements) structure returned from a call
to [vkGetAccelerationStructureMemoryRequirementsNV](#vkGetAccelerationStructureMemoryRequirementsNV) with
`accelerationStructure` and `type` of
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV](#VkAccelerationStructureMemoryRequirementsTypeNV)

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-size-03624) VUID-VkBindAccelerationStructureMemoryInfoNV-size-03624

The `size` member of the `VkMemoryRequirements` structure
returned from a call to
[vkGetAccelerationStructureMemoryRequirementsNV](#vkGetAccelerationStructureMemoryRequirementsNV) with
`accelerationStructure` and `type` of
[VK_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_TYPE_OBJECT_NV](#VkAccelerationStructureMemoryRequirementsTypeNV) **must**
be less than or equal to the size of `memory` minus
`memoryOffset`

Valid Usage (Implicit)

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-sType-sType) VUID-VkBindAccelerationStructureMemoryInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_ACCELERATION_STRUCTURE_MEMORY_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-pNext-pNext) VUID-VkBindAccelerationStructureMemoryInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-accelerationStructure-parameter) VUID-VkBindAccelerationStructureMemoryInfoNV-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid [VkAccelerationStructureNV](#VkAccelerationStructureNV) handle

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-memory-parameter) VUID-VkBindAccelerationStructureMemoryInfoNV-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](memory.html#VkDeviceMemory) handle

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-pDeviceIndices-parameter) VUID-VkBindAccelerationStructureMemoryInfoNV-pDeviceIndices-parameter

 If `deviceIndexCount` is not `0`, `pDeviceIndices` **must** be a valid pointer to an array of `deviceIndexCount` `uint32_t` values

* 
[](#VUID-VkBindAccelerationStructureMemoryInfoNV-commonparent) VUID-VkBindAccelerationStructureMemoryInfoNV-commonparent

 Both of `accelerationStructure`, and `memory` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

To allow constructing geometry instances with device code if desired, we
need to be able to query an opaque handle for an acceleration structure.
This handle is a value of 8 bytes.
To get this handle, call:

// Provided by VK_NV_ray_tracing
VkResult vkGetAccelerationStructureHandleNV(
    VkDevice                                    device,
    VkAccelerationStructureNV                   accelerationStructure,
    size_t                                      dataSize,
    void*                                       pData);

* 
`device` is the logical device that owns the acceleration
structures.

* 
`accelerationStructure` is the acceleration structure.

* 
`dataSize` is the size in bytes of the buffer pointed to by
`pData`.

* 
`pData` is a pointer to an application-allocated buffer where the
results will be written.

Valid Usage

* 
[](#VUID-vkGetAccelerationStructureHandleNV-dataSize-02240) VUID-vkGetAccelerationStructureHandleNV-dataSize-02240

`dataSize` **must** be large enough to contain the result of the query,
as described above

* 
[](#VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-02787) VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-02787

`accelerationStructure` **must** be bound completely and contiguously
to a single `VkDeviceMemory` object via
[vkBindAccelerationStructureMemoryNV](#vkBindAccelerationStructureMemoryNV)

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureHandleNV-device-parameter) VUID-vkGetAccelerationStructureHandleNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-parameter) VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid [VkAccelerationStructureNV](#VkAccelerationStructureNV) handle

* 
[](#VUID-vkGetAccelerationStructureHandleNV-pData-parameter) VUID-vkGetAccelerationStructureHandleNV-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkGetAccelerationStructureHandleNV-dataSize-arraylength) VUID-vkGetAccelerationStructureHandleNV-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-parent) VUID-vkGetAccelerationStructureHandleNV-accelerationStructure-parent

 `accelerationStructure` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To query the 64-bit device address for an acceleration structure, call:

// Provided by VK_KHR_acceleration_structure
VkDeviceAddress vkGetAccelerationStructureDeviceAddressKHR(
    VkDevice                                    device,
    const VkAccelerationStructureDeviceAddressInfoKHR* pInfo);

* 
`device` is the logical device that the acceleration structure was
created on.

* 
`pInfo` is a pointer to a
[VkAccelerationStructureDeviceAddressInfoKHR](#VkAccelerationStructureDeviceAddressInfoKHR) structure specifying
the acceleration structure to retrieve an address for.

The 64-bit return value is an address of the acceleration structure, which
can be used for device and shader operations that involve acceleration
structures, such as
ray traversal and
acceleration structure building.

If the acceleration structure was created with
[vkCreateAccelerationStructure2KHR](#vkCreateAccelerationStructure2KHR), the return value will be the same
address as `addressRange.address`.

If the acceleration structure was created with
[vkCreateAccelerationStructureKHR](#vkCreateAccelerationStructureKHR) with a non-zero value of
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR)::`deviceAddress`, the return
value will be the same address.

If the acceleration structure was created with a `type` of
[VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](#VkAccelerationStructureTypeNV), the returned address **must**
be consistent with the relative offset to other acceleration structures with
`type` [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](#VkAccelerationStructureTypeNV) allocated with
the same [VkBuffer](#VkBuffer).
That is, the difference in returned addresses between the two **must** be the
same as the difference in offsets provided at acceleration structure
creation.

The returned address **must** be aligned to 256 bytes.

|  | For acceleration structures created with
| --- | --- |
[vkCreateAccelerationStructureKHR](#vkCreateAccelerationStructureKHR), their device address **may** be
different from the buffer device address corresponding to the acceleration
structure’s start offset in its storage buffer for acceleration structure
types other than [VK_ACCELERATION_STRUCTURE_TYPE_GENERIC_KHR](#VkAccelerationStructureTypeNV). |

Valid Usage

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-accelerationStructure-08935) VUID-vkGetAccelerationStructureDeviceAddressKHR-accelerationStructure-08935

The [    `VkPhysicalDeviceAccelerationStructureFeaturesKHR`::`accelerationStructure`](features.html#features-accelerationStructure)
feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-device-03504) VUID-vkGetAccelerationStructureDeviceAddressKHR-device-03504

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-09541) VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-09541

If the buffer on which `pInfo->accelerationStructure` was placed is
non-sparse then it **must** be bound completely and contiguously to a
single `VkDeviceMemory` object

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-09542) VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-09542

The buffer on which `pInfo->accelerationStructure` was placed **must**
have been created with the
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-device-parameter) VUID-vkGetAccelerationStructureDeviceAddressKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-parameter) VUID-vkGetAccelerationStructureDeviceAddressKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAccelerationStructureDeviceAddressInfoKHR](#VkAccelerationStructureDeviceAddressInfoKHR) structure

The `VkAccelerationStructureDeviceAddressInfoKHR` structure is defined
as:

// Provided by VK_KHR_acceleration_structure
typedef struct VkAccelerationStructureDeviceAddressInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    VkAccelerationStructureKHR    accelerationStructure;
} VkAccelerationStructureDeviceAddressInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructure` specifies the acceleration structure whose
address is being queried.

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureDeviceAddressInfoKHR-sType-sType) VUID-VkAccelerationStructureDeviceAddressInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_DEVICE_ADDRESS_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureDeviceAddressInfoKHR-pNext-pNext) VUID-VkAccelerationStructureDeviceAddressInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureDeviceAddressInfoKHR-accelerationStructure-parameter) VUID-VkAccelerationStructureDeviceAddressInfoKHR-accelerationStructure-parameter

 `accelerationStructure` **must** be a valid [VkAccelerationStructureKHR](#VkAccelerationStructureKHR) handle

Micromaps are opaque data structures that are built by the implementation to
encode sub-triangle data to be included in an acceleration structure.

Micromaps are represented by `VkMicromapEXT` handles:

// Provided by VK_EXT_opacity_micromap
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkMicromapEXT)

To create a micromap, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkCreateMicromapEXT(
    VkDevice                                    device,
    const VkMicromapCreateInfoEXT*              pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkMicromapEXT*                              pMicromap);

* 
`device` is the logical device that creates the micromap object.

* 
`pCreateInfo` is a pointer to a [VkMicromapCreateInfoEXT](#VkMicromapCreateInfoEXT)
structure containing parameters affecting creation of the micromap.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pMicromap` is a pointer to a [VkMicromapEXT](#VkMicromapEXT) handle in which
the resulting micromap object is returned.

Similar to other objects in Vulkan, the micromap creation merely creates an
object with a specific “shape”.
The type and quantity of geometry that can be built into a micromap is
determined by the parameters of [VkMicromapCreateInfoEXT](#VkMicromapCreateInfoEXT).

The micromap data is stored in the object referred to by
`VkMicromapCreateInfoEXT`::`buffer`.
Once memory has been bound to that buffer, it **must** be populated by micromap
build or micromap copy commands such as [vkCmdBuildMicromapsEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdBuildMicromapsEXT),
[vkBuildMicromapsEXT](VK_EXT_opacity_micromap/micromaps.html#vkBuildMicromapsEXT), [vkCmdCopyMicromapEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMicromapEXT), and
[vkCopyMicromapEXT](VK_EXT_opacity_micromap/micromaps.html#vkCopyMicromapEXT).

|  | The expected usage for a trace capture/replay tool is that it will serialize
| --- | --- |
and later deserialize the micromap data using micromap copy commands.
During capture the tool will use [vkCopyMicromapToMemoryEXT](VK_EXT_opacity_micromap/micromaps.html#vkCopyMicromapToMemoryEXT) or
[vkCmdCopyMicromapToMemoryEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMicromapToMemoryEXT) with a `mode` of
[VK_COPY_MICROMAP_MODE_SERIALIZE_EXT](VK_EXT_opacity_micromap/micromaps.html#VkCopyMicromapModeEXT), and
[vkCopyMemoryToMicromapEXT](VK_EXT_opacity_micromap/micromaps.html#vkCopyMemoryToMicromapEXT) or [vkCmdCopyMemoryToMicromapEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMemoryToMicromapEXT) with a
`mode` of [VK_COPY_MICROMAP_MODE_DESERIALIZE_EXT](VK_EXT_opacity_micromap/micromaps.html#VkCopyMicromapModeEXT) during replay. |

The input buffers passed to micromap build commands will be referenced by
the implementation for the duration of the command.
Micromaps **must** be fully self-contained.
The application **can** reuse or free any memory which was used by the command
as an input or as scratch without affecting the results of a subsequent
acceleration structure build using the micromap or traversal of that
acceleration structure.

Valid Usage

* 
[](#VUID-vkCreateMicromapEXT-micromap-07430) VUID-vkCreateMicromapEXT-micromap-07430

The [`micromap`](features.html#features-micromap) feature **must** be enabled

* 
[](#VUID-vkCreateMicromapEXT-device-07432) VUID-vkCreateMicromapEXT-device-07432

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

* 
[](#VUID-vkCreateMicromapEXT-deviceAddress-07431) VUID-vkCreateMicromapEXT-deviceAddress-07431

If [VkMicromapCreateInfoEXT](#VkMicromapCreateInfoEXT)::`deviceAddress` is not zero, the
[`micromapCaptureReplay`](features.html#features-micromapCaptureReplay) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateMicromapEXT-device-parameter) VUID-vkCreateMicromapEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateMicromapEXT-pCreateInfo-parameter) VUID-vkCreateMicromapEXT-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkMicromapCreateInfoEXT](#VkMicromapCreateInfoEXT) structure

* 
[](#VUID-vkCreateMicromapEXT-pAllocator-parameter) VUID-vkCreateMicromapEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateMicromapEXT-pMicromap-parameter) VUID-vkCreateMicromapEXT-pMicromap-parameter

 `pMicromap` **must** be a valid pointer to a [VkMicromapEXT](#VkMicromapEXT) handle

* 
[](#VUID-vkCreateMicromapEXT-device-queuecount) VUID-vkCreateMicromapEXT-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMicromapCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapCreateInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkMicromapCreateFlagsEXT    createFlags;
    VkBuffer                    buffer;
    VkDeviceSize                offset;
    VkDeviceSize                size;
    VkMicromapTypeEXT           type;
    VkDeviceAddress             deviceAddress;
} VkMicromapCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`createFlags` is a bitmask of [VkMicromapCreateFlagBitsEXT](#VkMicromapCreateFlagBitsEXT)
specifying additional creation parameters of the micromap.

* 
`buffer` is the buffer on which the micromap will be stored.

* 
`offset` is an offset in bytes from the base address of the buffer
at which the micromap will be stored, and **must** be a multiple of `256`.

* 
`size` is the size required for the micromap.

* 
`type` is a [VkMicromapTypeEXT](#VkMicromapTypeEXT) value specifying the type of
micromap that will be created.

* 
`deviceAddress` is the device address requested for the micromap if
the [`micromapCaptureReplay`](features.html#features-micromapCaptureReplay)
feature is being used.

If `deviceAddress` is zero, no specific address is requested.

If `deviceAddress` is not zero, `deviceAddress` **must** be an address
retrieved from an identically created micromap on the same implementation.
The micromap **must** also be placed on an identically created `buffer` and
at the same `offset`.

Applications **should** avoid creating micromaps with application-provided
addresses and implementation-provided addresses in the same process, to
reduce the likelihood of [VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)
errors.

|  | The expected usage for this is that a trace capture/replay tool will add the
| --- | --- |
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits) flag to all buffers
that use [VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits), and will add
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits) to all buffers used as
storage for a micromap where `deviceAddress` is not zero.
This also means that the tool will need to add
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) to memory allocations to allow
the flag to be set where the application may not have otherwise required it.
During capture the tool will save the queried opaque device addresses in the
trace.
During replay, the buffers will be created specifying the original address
so any address values stored in the trace data will remain valid.

Implementations are expected to separate such buffers in the GPU address
space so normal allocations will avoid using these addresses.
Applications and tools should avoid mixing application-provided and
implementation-provided addresses for buffers created with
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits), to avoid address
space allocation conflicts. |

If the micromap will be the target of a build operation, the required size
for a micromap **can** be queried with [vkGetMicromapBuildSizesEXT](#vkGetMicromapBuildSizesEXT).

Valid Usage

* 
[](#VUID-VkMicromapCreateInfoEXT-deviceAddress-07433) VUID-VkMicromapCreateInfoEXT-deviceAddress-07433

If `deviceAddress` is not zero, `createFlags` **must** include
[VK_MICROMAP_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT](#VkMicromapCreateFlagBitsEXT)

* 
[](#VUID-VkMicromapCreateInfoEXT-createFlags-07434) VUID-VkMicromapCreateInfoEXT-createFlags-07434

If `createFlags` includes
[VK_MICROMAP_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT](#VkMicromapCreateFlagBitsEXT),
[VkPhysicalDeviceOpacityMicromapFeaturesEXT](features.html#VkPhysicalDeviceOpacityMicromapFeaturesEXT)::`micromapCaptureReplay`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkMicromapCreateInfoEXT-buffer-07435) VUID-VkMicromapCreateInfoEXT-buffer-07435

`buffer` **must** have been created with the
[VK_BUFFER_USAGE_MICROMAP_STORAGE_BIT_EXT](#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkMicromapCreateInfoEXT-buffer-07436) VUID-VkMicromapCreateInfoEXT-buffer-07436

`buffer` **must** not have been created with
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](#VkBufferCreateFlagBits)

* 
[](#VUID-VkMicromapCreateInfoEXT-offset-07437) VUID-VkMicromapCreateInfoEXT-offset-07437

The sum of `offset` and `size` **must** be less than or equal to
the size of `buffer`

* 
[](#VUID-VkMicromapCreateInfoEXT-offset-07438) VUID-VkMicromapCreateInfoEXT-offset-07438

`offset` **must** be a multiple of `256` bytes

Valid Usage (Implicit)

* 
[](#VUID-VkMicromapCreateInfoEXT-sType-sType) VUID-VkMicromapCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MICROMAP_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMicromapCreateInfoEXT-pNext-pNext) VUID-VkMicromapCreateInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMicromapCreateInfoEXT-createFlags-parameter) VUID-VkMicromapCreateInfoEXT-createFlags-parameter

 `createFlags` **must** be a valid combination of [VkMicromapCreateFlagBitsEXT](#VkMicromapCreateFlagBitsEXT) values

* 
[](#VUID-VkMicromapCreateInfoEXT-buffer-parameter) VUID-VkMicromapCreateInfoEXT-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](#VkBuffer) handle

* 
[](#VUID-VkMicromapCreateInfoEXT-type-parameter) VUID-VkMicromapCreateInfoEXT-type-parameter

 `type` **must** be a valid [VkMicromapTypeEXT](#VkMicromapTypeEXT) value

* 
[](#VUID-VkMicromapCreateInfoEXT-deviceAddress-parameter) VUID-VkMicromapCreateInfoEXT-deviceAddress-parameter

 If `deviceAddress` is not `0`, `deviceAddress` **must** be a valid `VkDeviceAddress` value

To get the build sizes for a micromap, call:

// Provided by VK_EXT_opacity_micromap
void vkGetMicromapBuildSizesEXT(
    VkDevice                                    device,
    VkAccelerationStructureBuildTypeKHR         buildType,
    const VkMicromapBuildInfoEXT*               pBuildInfo,
    VkMicromapBuildSizesInfoEXT*                pSizeInfo);

* 
`device` is the logical device that will be used for creating the
micromap.

* 
`buildType` defines whether host or device operations (or both) are
being queried for.

* 
`pBuildInfo` is a pointer to a [VkMicromapBuildInfoEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapBuildInfoEXT)
structure describing parameters of a build operation.

* 
`pSizeInfo` is a pointer to a [VkMicromapBuildSizesInfoEXT](#VkMicromapBuildSizesInfoEXT)
structure which returns the size required for a micromap and the sizes
required for the scratch buffers, given the build parameters.
The size requirements for a scratch buffer **may** be zero.

The `dstMicromap` and `mode` members of `pBuildInfo` are
ignored.
Any [VkDeviceOrHostAddressKHR](accelstructures.html#VkDeviceOrHostAddressKHR) members of `pBuildInfo` are ignored
by this command.

A micromap created with the `micromapSize` returned by this command
supports any build with a [VkMicromapBuildInfoEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapBuildInfoEXT) structure subject to
the following properties:

* 
The build command is a host build command, and `buildType` is
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_KHR](#VkAccelerationStructureBuildTypeKHR) or
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR](#VkAccelerationStructureBuildTypeKHR)

* 
The build command is a device build command, and `buildType` is
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_DEVICE_KHR](#VkAccelerationStructureBuildTypeKHR) or
[VK_ACCELERATION_STRUCTURE_BUILD_TYPE_HOST_OR_DEVICE_KHR](#VkAccelerationStructureBuildTypeKHR)

* 
For [VkMicromapBuildInfoEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapBuildInfoEXT):

Its `type`, and `flags` members are equal to
`pBuildInfo->type` and `pBuildInfo->flags`, respectively.

* 
The sum of usage information in either `pUsageCounts` or
`ppUsageCounts` is equal to the sum of usage information in either
`pBuildInfo->pUsageCounts` or `pBuildInfo->ppUsageCounts`.

Similarly, the `buildScratchSize` value will support any build command
specifying the [VK_BUILD_MICROMAP_MODE_BUILD_EXT](VK_EXT_opacity_micromap/micromaps.html#VkBuildMicromapModeEXT) `mode` under the
above conditions.

Valid Usage

* 
[](#VUID-vkGetMicromapBuildSizesEXT-dstMicromap-09180) VUID-vkGetMicromapBuildSizesEXT-dstMicromap-09180

[VkMicromapBuildInfoEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapBuildInfoEXT)::`dstMicromap` **must** have been created
from `device`

* 
[](#VUID-vkGetMicromapBuildSizesEXT-micromap-07439) VUID-vkGetMicromapBuildSizesEXT-micromap-07439

The [`micromap`](features.html#features-micromap) feature **must** be enabled

* 
[](#VUID-vkGetMicromapBuildSizesEXT-device-07440) VUID-vkGetMicromapBuildSizesEXT-device-07440

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetMicromapBuildSizesEXT-device-parameter) VUID-vkGetMicromapBuildSizesEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMicromapBuildSizesEXT-buildType-parameter) VUID-vkGetMicromapBuildSizesEXT-buildType-parameter

 `buildType` **must** be a valid [VkAccelerationStructureBuildTypeKHR](#VkAccelerationStructureBuildTypeKHR) value

* 
[](#VUID-vkGetMicromapBuildSizesEXT-pBuildInfo-parameter) VUID-vkGetMicromapBuildSizesEXT-pBuildInfo-parameter

 `pBuildInfo` **must** be a valid pointer to a valid [VkMicromapBuildInfoEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapBuildInfoEXT) structure

* 
[](#VUID-vkGetMicromapBuildSizesEXT-pSizeInfo-parameter) VUID-vkGetMicromapBuildSizesEXT-pSizeInfo-parameter

 `pSizeInfo` **must** be a valid pointer to a [VkMicromapBuildSizesInfoEXT](#VkMicromapBuildSizesInfoEXT) structure

The `VkMicromapBuildSizesInfoEXT` structure describes the required build
sizes for a micromap and scratch buffers and is defined as:

// Provided by VK_EXT_opacity_micromap
typedef struct VkMicromapBuildSizesInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceSize       micromapSize;
    VkDeviceSize       buildScratchSize;
    VkBool32           discardable;
} VkMicromapBuildSizesInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`micromapSize` is the size in bytes required in a
[VkMicromapEXT](#VkMicromapEXT) for a build or update operation.

* 
`buildScratchSize` is the size in bytes required in a scratch buffer
for a build operation.

* 
`discardable` indicates whether or not the micromap object may be
destroyed after an acceleration structure build or update.
A false value means that acceleration structures built with this
micromap **may** contain references to the data contained therein, and the
application **must** not destroy the micromap until ray traversal has
concluded.
A true value means that the information in the micromap will be copied
by value into the acceleration structure, and the micromap **may** be
destroyed after the acceleration structure build concludes.

Valid Usage (Implicit)

* 
[](#VUID-VkMicromapBuildSizesInfoEXT-sType-sType) VUID-VkMicromapBuildSizesInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MICROMAP_BUILD_SIZES_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMicromapBuildSizesInfoEXT-pNext-pNext) VUID-VkMicromapBuildSizesInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

Values which **can** be set in [VkMicromapCreateInfoEXT](#VkMicromapCreateInfoEXT)::`type`
specifying the type of micromap, are:

// Provided by VK_EXT_opacity_micromap
typedef enum VkMicromapTypeEXT {
    VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT = 0,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_displacement_micromap
    VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV = 1000397000,
#endif
} VkMicromapTypeEXT;

* 
[VK_MICROMAP_TYPE_OPACITY_MICROMAP_EXT](#VkMicromapTypeEXT) is a micromap containing
data to control the opacity of a triangle.

* 
[VK_MICROMAP_TYPE_DISPLACEMENT_MICROMAP_NV](#VkMicromapTypeEXT) is a micromap containing
data to control the displacement of subtriangles within a triangle.

Bits which **can** be set in [VkMicromapCreateInfoEXT](#VkMicromapCreateInfoEXT)::`createFlags`,
specifying additional creation parameters for micromaps, are:

// Provided by VK_EXT_opacity_micromap
typedef enum VkMicromapCreateFlagBitsEXT {
    VK_MICROMAP_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT = 0x00000001,
} VkMicromapCreateFlagBitsEXT;

* 
[VK_MICROMAP_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_EXT](#VkMicromapCreateFlagBitsEXT) specifies
that the micromap’s address **can** be saved and reused on a subsequent
run.

// Provided by VK_EXT_opacity_micromap
typedef VkFlags VkMicromapCreateFlagsEXT;

`VkMicromapCreateFlagsEXT` is a bitmask type for setting a mask of zero
or more [VkMicromapCreateFlagBitsEXT](#VkMicromapCreateFlagBitsEXT).

Bits which **can** be set in [VkMicromapBuildInfoEXT](VK_EXT_opacity_micromap/micromaps.html#VkMicromapBuildInfoEXT)::`flags`
specifying additional parameters for micromap builds, are:

// Provided by VK_EXT_opacity_micromap
typedef enum VkBuildMicromapFlagBitsEXT {
    VK_BUILD_MICROMAP_PREFER_FAST_TRACE_BIT_EXT = 0x00000001,
    VK_BUILD_MICROMAP_PREFER_FAST_BUILD_BIT_EXT = 0x00000002,
    VK_BUILD_MICROMAP_ALLOW_COMPACTION_BIT_EXT = 0x00000004,
} VkBuildMicromapFlagBitsEXT;

* 
[VK_BUILD_MICROMAP_PREFER_FAST_TRACE_BIT_EXT](#VkBuildMicromapFlagBitsEXT) specifies that the
given micromap build **should** prioritize trace performance over build
time.

* 
[VK_BUILD_MICROMAP_PREFER_FAST_BUILD_BIT_EXT](#VkBuildMicromapFlagBitsEXT) specifies that the
given micromap build **should** prioritize build time over trace
performance.

// Provided by VK_EXT_opacity_micromap
typedef VkFlags VkBuildMicromapFlagsEXT;

`VkBuildMicromapFlagsEXT` is a bitmask type for setting a mask of zero
or more [VkBuildMicromapFlagBitsEXT](#VkBuildMicromapFlagBitsEXT).

To destroy a micromap, call:

// Provided by VK_EXT_opacity_micromap
void vkDestroyMicromapEXT(
    VkDevice                                    device,
    VkMicromapEXT                               micromap,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the micromap.

* 
`micromap` is the micromap to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyMicromapEXT-micromap-10382) VUID-vkDestroyMicromapEXT-micromap-10382

The [`micromap`](features.html#features-micromap) feature **must** be enabled

* 
[](#VUID-vkDestroyMicromapEXT-micromap-07441) VUID-vkDestroyMicromapEXT-micromap-07441

All submitted commands that refer to `micromap` **must** have completed
execution

* 
[](#VUID-vkDestroyMicromapEXT-micromap-07442) VUID-vkDestroyMicromapEXT-micromap-07442

If `VkAllocationCallbacks` were provided when `micromap` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyMicromapEXT-micromap-07443) VUID-vkDestroyMicromapEXT-micromap-07443

If no `VkAllocationCallbacks` were provided when `micromap` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyMicromapEXT-device-parameter) VUID-vkDestroyMicromapEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyMicromapEXT-micromap-parameter) VUID-vkDestroyMicromapEXT-micromap-parameter

 If `micromap` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `micromap` **must** be a valid [VkMicromapEXT](#VkMicromapEXT) handle

* 
[](#VUID-vkDestroyMicromapEXT-pAllocator-parameter) VUID-vkDestroyMicromapEXT-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyMicromapEXT-micromap-parent) VUID-vkDestroyMicromapEXT-micromap-parent

 If `micromap` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `micromap` **must** be externally synchronized

Resources are initially created as *virtual allocations* with no backing
memory.
Device memory is allocated separately (see [Device Memory](memory.html#memory-device)) and then
associated with the resource.
This association is done differently for sparse and non-sparse resources.

Resources created with any of the sparse creation flags are considered
sparse resources.
Resources created without these flags are non-sparse.
The details on resource memory association for sparse resources is described
in [Sparse Resources](sparsemem.html#sparsememory).

Non-sparse resources **must** be bound completely and contiguously to a single
`VkDeviceMemory` object before the resource is passed as a parameter to
any of the following operations:

* 
creating buffer, image, or tensor views

* 
updating descriptor sets

* 
recording commands in a command buffer

Once bound, the memory binding is immutable for the lifetime of the
resource.

In a logical device representing more than one physical device, buffer and
image resources exist on all physical devices but **can** be bound to memory
differently on each.
Each such replicated resource is an *instance* of the resource.
For sparse resources, each instance **can** be bound to memory arbitrarily
differently.
For non-sparse resources, each instance **can** either be bound to the local or
a peer instance of the memory, or for images **can** be bound to rectangular
regions from the local and/or peer instances.
When a resource is used in a descriptor set, each physical device interprets
the descriptor according to its own instance’s binding to memory.

|  | There are no new copy commands to transfer data between physical devices.
| --- | --- |
Instead, an application **can** create a resource with a peer mapping and use
it as the source or destination of a transfer command executed by a single
physical device to copy the data from one physical device to another. |

To determine the memory requirements for a buffer resource, call:

// Provided by VK_VERSION_1_0
void vkGetBufferMemoryRequirements(
    VkDevice                                    device,
    VkBuffer                                    buffer,
    VkMemoryRequirements*                       pMemoryRequirements);

* 
`device` is the logical device that owns the buffer.

* 
`buffer` is the buffer to query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements](#VkMemoryRequirements)
structure in which the memory requirements of the buffer object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferMemoryRequirements-device-parameter) VUID-vkGetBufferMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetBufferMemoryRequirements-buffer-parameter) VUID-vkGetBufferMemoryRequirements-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](#VkBuffer) handle

* 
[](#VUID-vkGetBufferMemoryRequirements-pMemoryRequirements-parameter) VUID-vkGetBufferMemoryRequirements-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements](#VkMemoryRequirements) structure

* 
[](#VUID-vkGetBufferMemoryRequirements-buffer-parent) VUID-vkGetBufferMemoryRequirements-buffer-parent

 `buffer` **must** have been created, allocated, or retrieved from `device`

To determine the memory requirements for an image resource which is not
created with the [VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) flag set, call:

// Provided by VK_VERSION_1_0
void vkGetImageMemoryRequirements(
    VkDevice                                    device,
    VkImage                                     image,
    VkMemoryRequirements*                       pMemoryRequirements);

* 
`device` is the logical device that owns the image.

* 
`image` is the image to query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements](#VkMemoryRequirements)
structure in which the memory requirements of the image object are
returned.

Valid Usage

* 
[](#VUID-vkGetImageMemoryRequirements-image-01588) VUID-vkGetImageMemoryRequirements-image-01588

`image` **must** not have been created with the
[VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) flag set

* 
[](#VUID-vkGetImageMemoryRequirements-image-04004) VUID-vkGetImageMemoryRequirements-image-04004

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
external memory handle type, then `image` **must** be bound to memory

* 
[](#VUID-vkGetImageMemoryRequirements-image-08960) VUID-vkGetImageMemoryRequirements-image-08960

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) external
memory handle type, then `image` **must** be bound to memory

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageMemoryRequirements-device-parameter) VUID-vkGetImageMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageMemoryRequirements-image-parameter) VUID-vkGetImageMemoryRequirements-image-parameter

 `image` **must** be a valid [VkImage](#VkImage) handle

* 
[](#VUID-vkGetImageMemoryRequirements-pMemoryRequirements-parameter) VUID-vkGetImageMemoryRequirements-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements](#VkMemoryRequirements) structure

* 
[](#VUID-vkGetImageMemoryRequirements-image-parent) VUID-vkGetImageMemoryRequirements-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

To determine the memory requirements for a tensor resource, call:

// Provided by VK_ARM_tensors
void vkGetTensorMemoryRequirementsARM(
    VkDevice                                    device,
    const VkTensorMemoryRequirementsInfoARM*    pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the tensor.

* 
`pInfo` is a pointer to a [VkTensorMemoryRequirementsInfoARM](#VkTensorMemoryRequirementsInfoARM)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2)
structure in which the memory requirements of the tensor object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetTensorMemoryRequirementsARM-device-parameter) VUID-vkGetTensorMemoryRequirementsARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetTensorMemoryRequirementsARM-pInfo-parameter) VUID-vkGetTensorMemoryRequirementsARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkTensorMemoryRequirementsInfoARM](#VkTensorMemoryRequirementsInfoARM) structure

* 
[](#VUID-vkGetTensorMemoryRequirementsARM-pMemoryRequirements-parameter) VUID-vkGetTensorMemoryRequirementsARM-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2) structure

The `VkTensorMemoryRequirementsInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorMemoryRequirementsInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorARM        tensor;
} VkTensorMemoryRequirementsInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensor` is the tensor to query.

Valid Usage (Implicit)

* 
[](#VUID-VkTensorMemoryRequirementsInfoARM-sType-sType) VUID-VkTensorMemoryRequirementsInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_MEMORY_REQUIREMENTS_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTensorMemoryRequirementsInfoARM-pNext-pNext) VUID-VkTensorMemoryRequirementsInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTensorMemoryRequirementsInfoARM-tensor-parameter) VUID-VkTensorMemoryRequirementsInfoARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](#VkTensorARM) handle

To determine the memory requirements for a tensor resource without creating
an object, call:

// Provided by VK_ARM_tensors
void vkGetDeviceTensorMemoryRequirementsARM(
    VkDevice                                    device,
    const VkDeviceTensorMemoryRequirementsARM*  pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device intended to own the tensor.

* 
`pInfo` is a pointer to a [VkDeviceTensorMemoryRequirementsARM](#VkDeviceTensorMemoryRequirementsARM)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2)
structure in which the memory requirements of the tensor object are
returned.

Valid Usage

* 
[](#VUID-vkGetDeviceTensorMemoryRequirementsARM-tensors-09831) VUID-vkGetDeviceTensorMemoryRequirementsARM-tensors-09831

The [`tensors`](features.html#features-tensors) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceTensorMemoryRequirementsARM-device-parameter) VUID-vkGetDeviceTensorMemoryRequirementsARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceTensorMemoryRequirementsARM-pInfo-parameter) VUID-vkGetDeviceTensorMemoryRequirementsARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceTensorMemoryRequirementsARM](#VkDeviceTensorMemoryRequirementsARM) structure

* 
[](#VUID-vkGetDeviceTensorMemoryRequirementsARM-pMemoryRequirements-parameter) VUID-vkGetDeviceTensorMemoryRequirementsARM-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2) structure

The `VkDeviceTensorMemoryRequirementsARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkDeviceTensorMemoryRequirementsARM {
    VkStructureType                 sType;
    const void*                     pNext;
    const VkTensorCreateInfoARM*    pCreateInfo;
} VkDeviceTensorMemoryRequirementsARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pCreateInfo` is a pointer to a [VkTensorCreateInfoARM](#VkTensorCreateInfoARM)
structure containing parameters affecting the creation of the tensor to
query.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceTensorMemoryRequirementsARM-sType-sType) VUID-VkDeviceTensorMemoryRequirementsARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_TENSOR_MEMORY_REQUIREMENTS_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceTensorMemoryRequirementsARM-pNext-pNext) VUID-VkDeviceTensorMemoryRequirementsARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceTensorMemoryRequirementsARM-pCreateInfo-parameter) VUID-VkDeviceTensorMemoryRequirementsARM-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkTensorCreateInfoARM](#VkTensorCreateInfoARM) structure

The `VkMemoryRequirements` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkMemoryRequirements {
    VkDeviceSize    size;
    VkDeviceSize    alignment;
    uint32_t        memoryTypeBits;
} VkMemoryRequirements;

* 
`size` is the size, in bytes, of the memory allocation **required** for
the resource.

* 
`alignment` is the alignment, in bytes, of the offset within the
allocation **required** for the resource.

* 
`memoryTypeBits` is a bitmask and contains one bit set for every
supported memory type for the resource.
Bit `i` is set if and only if the memory type `i` in the
`VkPhysicalDeviceMemoryProperties` structure for the physical device
is supported for the resource.

The precise size of images that will be bound to external Android hardware
buffer memory is unknown until the memory has been imported or allocated, so
applications **must** not call [vkGetImageMemoryRequirements](#vkGetImageMemoryRequirements) or
[vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) with such a [VkImage](#VkImage) before it has
been bound to memory.
For this reason, applications also **must** not call
[vkGetDeviceImageMemoryRequirements](#vkGetDeviceImageMemoryRequirements) with a [VkImageCreateInfo](#VkImageCreateInfo)
describing an external Android hardware buffer.
When importing Android hardware buffer memory, the `allocationSize` **can**
be determined by calling [vkGetAndroidHardwareBufferPropertiesANDROID](memory.html#vkGetAndroidHardwareBufferPropertiesANDROID).
When allocating new memory for a [VkImage](#VkImage) that **can** be exported to an
Android hardware buffer, the memory’s `allocationSize` **must** be zero;
the actual size will be determined by the dedicated image’s parameters.
After the memory has been allocated, the amount of space allocated from the
memory’s heap **can** be obtained by getting the image’s memory requirements or
by calling [vkGetAndroidHardwareBufferPropertiesANDROID](memory.html#vkGetAndroidHardwareBufferPropertiesANDROID) with the
Android hardware buffer exported from the memory.

When allocating new memory for a [VkBuffer](#VkBuffer) that **can** be exported to an
Android hardware buffer an application **may** still call
[vkGetBufferMemoryRequirements](#vkGetBufferMemoryRequirements) or [vkGetBufferMemoryRequirements2](#vkGetBufferMemoryRequirements2)
with [VkBuffer](#VkBuffer) before it has been bound to memory.

The value of `size` has no meaning and **should** be ignored if the
resource being queried was created with any of the following external memory
handle types:

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

The implementation guarantees certain properties about the memory
requirements returned by
[vkGetBufferMemoryRequirements2](#vkGetBufferMemoryRequirements2), [vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2),
[vkGetDeviceBufferMemoryRequirements](#vkGetDeviceBufferMemoryRequirements),
[vkGetDeviceImageMemoryRequirements](#vkGetDeviceImageMemoryRequirements),
[vkGetDeviceTensorMemoryRequirementsARM](#vkGetDeviceTensorMemoryRequirementsARM),
[vkGetTensorMemoryRequirementsARM](#vkGetTensorMemoryRequirementsARM),
[vkGetBufferMemoryRequirements](#vkGetBufferMemoryRequirements) and [vkGetImageMemoryRequirements](#vkGetImageMemoryRequirements):

* 
The `memoryTypeBits` member always contains at least one bit set.

* 
If `buffer` is a `VkBuffer` not created with the
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits) or
[VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits) bits set, or if `image` is a
[linear](../appendices/glossary.html#glossary-linear-resource) image that was not created with the
[VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits) bit set,
or if `tensor` is a `VkTensorARM` not created with the
[VK_TENSOR_CREATE_PROTECTED_BIT_ARM](#VkTensorCreateFlagBitsARM),
then the `memoryTypeBits` member always contains at least one bit
set corresponding to a `VkMemoryType` with a `propertyFlags`
that has both the [VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](memory.html#VkMemoryPropertyFlagBits) bit and the
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](memory.html#VkMemoryPropertyFlagBits) bit set.
In other words, mappable coherent memory **can** always be attached to
these objects.

* 
If `buffer` was created with
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo)::`handleTypes` set to `0` or
`image` was created with
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)::`handleTypes` set to `0`,
or `tensor` was created with
[VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM)::`handleTypes` set to `0`,
the
`memoryTypeBits` member always contains at least one bit set
corresponding to a `VkMemoryType` with a `propertyFlags` that
has the [VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](memory.html#VkMemoryPropertyFlagBits) bit set.

* 
The `memoryTypeBits` member is identical for all `VkBuffer`
objects created with the same value for the `flags` and `usage`
members in the [VkBufferCreateInfo](#VkBufferCreateInfo) structure
and the `handleTypes` member of the
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo) structure
passed to [vkCreateBuffer](#vkCreateBuffer).
Further, if `usage1` and `usage2` of type [VkBufferUsageFlags](#VkBufferUsageFlags)
are such that the bits set in `usage2` are a subset of the bits set
in `usage1`, and they have the same
`flags` and
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo)::`handleTypes`,
then the bits set in `memoryTypeBits` returned for `usage1` **must**
be a subset of the bits set in `memoryTypeBits` returned for
`usage2`, for all values of `flags`.

* 
The `alignment` member is a power of two.

* 
The `alignment` member is identical for all `VkBuffer` objects
created with the same combination of values for the `usage` and
`flags` members in the [VkBufferCreateInfo](#VkBufferCreateInfo) structure passed to
[vkCreateBuffer](#vkCreateBuffer).

* 
If the [`maintenance4`](features.html#features-maintenance4) feature is enabled,
then the `alignment` member is identical for all `VkImage`
objects created with the same combination of values for the `flags`,
`imageType`, `format`, `extent`, `mipLevels`,
`arrayLayers`, `samples`, `tiling` and `usage` members
in the [VkImageCreateInfo](#VkImageCreateInfo) structure passed to [vkCreateImage](#vkCreateImage).

* 
The `alignment` member satisfies the buffer descriptor offset
alignment requirements associated with the `VkBuffer`’s `usage`:

If `usage` included [VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits)
or [VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](#VkBufferUsageFlagBits), `alignment`
**must** be an integer multiple of
`VkPhysicalDeviceLimits`::`minTexelBufferOffsetAlignment`.

* 
If `usage` included [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](#VkBufferUsageFlagBits),
`alignment` **must** be an integer multiple of
`VkPhysicalDeviceLimits`::`minUniformBufferOffsetAlignment`.

* 
If `usage` included [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](#VkBufferUsageFlagBits),
`alignment` **must** be an integer multiple of
`VkPhysicalDeviceLimits`::`minStorageBufferOffsetAlignment`.

For images created with a color format, the `memoryTypeBits` member
is identical for all `VkImage` objects created with the same
combination of values for the `tiling` member, the
[VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits) bit
and [VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits) bit
of the `flags` member,
the [VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](#VkImageCreateFlagBits) bit of the
`flags` member,
the [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](#VkImageUsageFlagBits) bit of the `usage` member
if the
[VkPhysicalDeviceHostImageCopyProperties](limits.html#VkPhysicalDeviceHostImageCopyProperties)::`identicalMemoryTypeRequirements`
property is [VK_FALSE](fundamentals.html#VK_FALSE),
`handleTypes` member of [VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo),
and the [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits) of the `usage`
member in the [VkImageCreateInfo](#VkImageCreateInfo) structure passed to
[vkCreateImage](#vkCreateImage).

For images created with a depth/stencil format, the `memoryTypeBits`
member is identical for all `VkImage` objects created with the same
combination of values for the `format` member, the `tiling`
member, the [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits) bit
and [VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits) bit
of the `flags` member,
the [VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](#VkImageCreateFlagBits) bit of the
`flags` member,
the [VK_IMAGE_USAGE_HOST_TRANSFER_BIT](#VkImageUsageFlagBits) bit of the `usage` member
if the
[VkPhysicalDeviceHostImageCopyProperties](limits.html#VkPhysicalDeviceHostImageCopyProperties)::`identicalMemoryTypeRequirements`
property is [VK_FALSE](fundamentals.html#VK_FALSE),
`handleTypes` member of [VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo),
and the [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits) of the `usage`
member in the [VkImageCreateInfo](#VkImageCreateInfo) structure passed to
[vkCreateImage](#vkCreateImage).

If the memory requirements are for a `VkImage`, the
`memoryTypeBits` member **must** not refer to a `VkMemoryType` with
a `propertyFlags` that has the
[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](memory.html#VkMemoryPropertyFlagBits) bit set if the `image`
did not have [VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits) bit set in
the `usage` member of the [VkImageCreateInfo](#VkImageCreateInfo) structure passed
to [vkCreateImage](#vkCreateImage).

If the memory requirements are for a `VkBuffer`, the
`memoryTypeBits` member **must** not refer to a `VkMemoryType` with
a `propertyFlags` that has the
[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](memory.html#VkMemoryPropertyFlagBits) bit set.

If the memory requirements are for a `VkTensorARM`, the
`memoryTypeBits` member **must** not refer to a `VkMemoryType` with
a `propertyFlags` that has the
[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](memory.html#VkMemoryPropertyFlagBits) bit set.

|  | The implication of this requirement is that lazily allocated memory is
| --- | --- |
disallowed for buffers in all cases. |

The `size` member is identical for all `VkBuffer` objects
created with the same combination of creation parameters specified in
[VkBufferCreateInfo](#VkBufferCreateInfo) and its `pNext` chain.

The `size` member is identical for all `VkImage` objects created
with the same combination of creation parameters specified in
[VkImageCreateInfo](#VkImageCreateInfo) and its `pNext` chain.

The `size` member is identical for all `VkTensorARM` objects
created with the same combination of creation parameters specified in
`VkTensorCreateInfoARM` and its `pNext` chain.

|  | This, however, does not imply that they interpret the contents of the bound
| --- | --- |
memory identically with each other.
That additional guarantee, however, **can** be explicitly requested using
[VK_IMAGE_CREATE_ALIAS_BIT](#VkImageCreateFlagBits). |

If the [`maintenance4`](features.html#features-maintenance4) feature is enabled,
these additional guarantees apply:

* 
For a `VkBuffer`, the `size` memory requirement is never
greater than that of another `VkBuffer` created with a greater or
equal `size` specified in [VkBufferCreateInfo](#VkBufferCreateInfo), all other
creation parameters being identical.

* 
For a `VkBuffer`, the `size` memory requirement is never
greater than the result of aligning
[VkBufferCreateInfo](#VkBufferCreateInfo)::`size` with the `alignment` memory
requirement.

* 
For a [VkImage](#VkImage), the `size` memory requirement is never greater
than that of another [VkImage](#VkImage) created with a greater or equal
value in each of `extent.width`, `extent.height`, and
`extent.depth`; all other creation parameters being identical.

* 
The memory requirements returned by
[vkGetDeviceBufferMemoryRequirements](#vkGetDeviceBufferMemoryRequirements) are identical to those that
would be returned by [vkGetBufferMemoryRequirements2](#vkGetBufferMemoryRequirements2) if it were
called with a `VkBuffer` created with the same
[VkBufferCreateInfo](#VkBufferCreateInfo) values.

* 
The memory requirements returned by
[vkGetDeviceImageMemoryRequirements](#vkGetDeviceImageMemoryRequirements) are identical to those that
would be returned by [vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) if it were
called with a `VkImage` created with the same
[VkImageCreateInfo](#VkImageCreateInfo) values.

* 
The memory requirements returned by
[vkGetDeviceTensorMemoryRequirementsARM](#vkGetDeviceTensorMemoryRequirementsARM) are identical to those
that would be returned by [vkGetTensorMemoryRequirementsARM](#vkGetTensorMemoryRequirementsARM) if it
were called with a `VkTensorARM` created with the same
[VkTensorCreateInfoARM](#VkTensorCreateInfoARM) values, including additional values
provided via a [VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM) structure.

To determine the memory requirements for a buffer resource, call:

// Provided by VK_VERSION_1_1
void vkGetBufferMemoryRequirements2(
    VkDevice                                    device,
    const VkBufferMemoryRequirementsInfo2*      pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to vkGetBufferMemoryRequirements2
void vkGetBufferMemoryRequirements2KHR(
    VkDevice                                    device,
    const VkBufferMemoryRequirementsInfo2*      pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the buffer.

* 
`pInfo` is a pointer to a [VkBufferMemoryRequirementsInfo2](#VkBufferMemoryRequirementsInfo2)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2)
structure in which the memory requirements of the buffer object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferMemoryRequirements2-device-parameter) VUID-vkGetBufferMemoryRequirements2-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetBufferMemoryRequirements2-pInfo-parameter) VUID-vkGetBufferMemoryRequirements2-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkBufferMemoryRequirementsInfo2](#VkBufferMemoryRequirementsInfo2) structure

* 
[](#VUID-vkGetBufferMemoryRequirements2-pMemoryRequirements-parameter) VUID-vkGetBufferMemoryRequirements2-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2) structure

To determine the memory requirements for a buffer resource without creating
an object, call:

// Provided by VK_VERSION_1_3
void vkGetDeviceBufferMemoryRequirements(
    VkDevice                                    device,
    const VkDeviceBufferMemoryRequirements*     pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

// Provided by VK_KHR_maintenance4
// Equivalent to vkGetDeviceBufferMemoryRequirements
void vkGetDeviceBufferMemoryRequirementsKHR(
    VkDevice                                    device,
    const VkDeviceBufferMemoryRequirements*     pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device intended to own the buffer.

* 
`pInfo` is a pointer to a [VkDeviceBufferMemoryRequirements](#VkDeviceBufferMemoryRequirements)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2)
structure in which the memory requirements of the buffer object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceBufferMemoryRequirements-device-parameter) VUID-vkGetDeviceBufferMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceBufferMemoryRequirements-pInfo-parameter) VUID-vkGetDeviceBufferMemoryRequirements-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceBufferMemoryRequirements](#VkDeviceBufferMemoryRequirements) structure

* 
[](#VUID-vkGetDeviceBufferMemoryRequirements-pMemoryRequirements-parameter) VUID-vkGetDeviceBufferMemoryRequirements-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2) structure

The `VkBufferMemoryRequirementsInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBufferMemoryRequirementsInfo2 {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           buffer;
} VkBufferMemoryRequirementsInfo2;

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to VkBufferMemoryRequirementsInfo2
typedef VkBufferMemoryRequirementsInfo2 VkBufferMemoryRequirementsInfo2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is the buffer to query.

Valid Usage (Implicit)

* 
[](#VUID-VkBufferMemoryRequirementsInfo2-sType-sType) VUID-VkBufferMemoryRequirementsInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_MEMORY_REQUIREMENTS_INFO_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferMemoryRequirementsInfo2-pNext-pNext) VUID-VkBufferMemoryRequirementsInfo2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBufferMemoryRequirementsInfo2-buffer-parameter) VUID-VkBufferMemoryRequirementsInfo2-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](#VkBuffer) handle

The `VkDeviceBufferMemoryRequirements` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkDeviceBufferMemoryRequirements {
    VkStructureType              sType;
    const void*                  pNext;
    const VkBufferCreateInfo*    pCreateInfo;
} VkDeviceBufferMemoryRequirements;

// Provided by VK_KHR_maintenance4
// Equivalent to VkDeviceBufferMemoryRequirements
typedef VkDeviceBufferMemoryRequirements VkDeviceBufferMemoryRequirementsKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pCreateInfo` is a pointer to a [VkBufferCreateInfo](#VkBufferCreateInfo) structure
containing parameters affecting creation of the buffer to query.

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceBufferMemoryRequirements-sType-sType) VUID-VkDeviceBufferMemoryRequirements-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_BUFFER_MEMORY_REQUIREMENTS](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceBufferMemoryRequirements-pNext-pNext) VUID-VkDeviceBufferMemoryRequirements-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceBufferMemoryRequirements-pCreateInfo-parameter) VUID-VkDeviceBufferMemoryRequirements-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkBufferCreateInfo](#VkBufferCreateInfo) structure

To determine the memory requirements for an image resource, call:

// Provided by VK_VERSION_1_1
void vkGetImageMemoryRequirements2(
    VkDevice                                    device,
    const VkImageMemoryRequirementsInfo2*       pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to vkGetImageMemoryRequirements2
void vkGetImageMemoryRequirements2KHR(
    VkDevice                                    device,
    const VkImageMemoryRequirementsInfo2*       pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device that owns the image.

* 
`pInfo` is a pointer to a [VkImageMemoryRequirementsInfo2](#VkImageMemoryRequirementsInfo2)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2)
structure in which the memory requirements of the image object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageMemoryRequirements2-device-parameter) VUID-vkGetImageMemoryRequirements2-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageMemoryRequirements2-pInfo-parameter) VUID-vkGetImageMemoryRequirements2-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageMemoryRequirementsInfo2](#VkImageMemoryRequirementsInfo2) structure

* 
[](#VUID-vkGetImageMemoryRequirements2-pMemoryRequirements-parameter) VUID-vkGetImageMemoryRequirements2-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2) structure

To determine the memory requirements for an image resource without creating
an object, call:

// Provided by VK_VERSION_1_3
void vkGetDeviceImageMemoryRequirements(
    VkDevice                                    device,
    const VkDeviceImageMemoryRequirements*      pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

// Provided by VK_KHR_maintenance4
// Equivalent to vkGetDeviceImageMemoryRequirements
void vkGetDeviceImageMemoryRequirementsKHR(
    VkDevice                                    device,
    const VkDeviceImageMemoryRequirements*      pInfo,
    VkMemoryRequirements2*                      pMemoryRequirements);

* 
`device` is the logical device intended to own the image.

* 
`pInfo` is a pointer to a [VkDeviceImageMemoryRequirements](#VkDeviceImageMemoryRequirements)
structure containing parameters required for the memory requirements
query.

* 
`pMemoryRequirements` is a pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2)
structure in which the memory requirements of the image object are
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceImageMemoryRequirements-device-parameter) VUID-vkGetDeviceImageMemoryRequirements-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceImageMemoryRequirements-pInfo-parameter) VUID-vkGetDeviceImageMemoryRequirements-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceImageMemoryRequirements](#VkDeviceImageMemoryRequirements) structure

* 
[](#VUID-vkGetDeviceImageMemoryRequirements-pMemoryRequirements-parameter) VUID-vkGetDeviceImageMemoryRequirements-pMemoryRequirements-parameter

 `pMemoryRequirements` **must** be a valid pointer to a [VkMemoryRequirements2](#VkMemoryRequirements2) structure

The `VkImageMemoryRequirementsInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkImageMemoryRequirementsInfo2 {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
} VkImageMemoryRequirementsInfo2;

// Provided by VK_KHR_get_memory_requirements2
// Equivalent to VkImageMemoryRequirementsInfo2
typedef VkImageMemoryRequirementsInfo2 VkImageMemoryRequirementsInfo2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is the image to query.

Valid Usage

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-01589) VUID-VkImageMemoryRequirementsInfo2-image-01589

If `image` was created with a *multi-planar* format and the
[VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) flag, there **must** be a
[VkImagePlaneMemoryRequirementsInfo](#VkImagePlaneMemoryRequirementsInfo) included in the `pNext`
chain of the [VkImageMemoryRequirementsInfo2](#VkImageMemoryRequirementsInfo2) structure

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-02279) VUID-VkImageMemoryRequirementsInfo2-image-02279

If `image` was created with [VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) and
with [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then there **must** be
a [VkImagePlaneMemoryRequirementsInfo](#VkImagePlaneMemoryRequirementsInfo) included in the `pNext`
chain of the [VkImageMemoryRequirementsInfo2](#VkImageMemoryRequirementsInfo2) structure

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-01590) VUID-VkImageMemoryRequirementsInfo2-image-01590

If `image` was not created with the
[VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) flag, there **must** not be a
[VkImagePlaneMemoryRequirementsInfo](#VkImagePlaneMemoryRequirementsInfo) included in the `pNext`
chain of the [VkImageMemoryRequirementsInfo2](#VkImageMemoryRequirementsInfo2) structure

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-02280) VUID-VkImageMemoryRequirementsInfo2-image-02280

If `image` was created with a single-plane format and with any
`tiling` other than [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling),
then there **must** not be a [VkImagePlaneMemoryRequirementsInfo](#VkImagePlaneMemoryRequirementsInfo)
included in the `pNext` chain of the
[VkImageMemoryRequirementsInfo2](#VkImageMemoryRequirementsInfo2) structure

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-01897) VUID-VkImageMemoryRequirementsInfo2-image-01897

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
external memory handle type, then `image` **must** be bound to memory

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-08961) VUID-VkImageMemoryRequirementsInfo2-image-08961

If `image` was created with the
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) external
memory handle type, then `image` **must** be bound to memory

Valid Usage (Implicit)

* 
[](#VUID-VkImageMemoryRequirementsInfo2-sType-sType) VUID-VkImageMemoryRequirementsInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_MEMORY_REQUIREMENTS_INFO_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageMemoryRequirementsInfo2-pNext-pNext) VUID-VkImageMemoryRequirementsInfo2-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkImagePlaneMemoryRequirementsInfo](#VkImagePlaneMemoryRequirementsInfo)

* 
[](#VUID-VkImageMemoryRequirementsInfo2-sType-unique) VUID-VkImageMemoryRequirementsInfo2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkImageMemoryRequirementsInfo2-image-parameter) VUID-VkImageMemoryRequirementsInfo2-image-parameter

 `image` **must** be a valid [VkImage](#VkImage) handle

The `VkDeviceImageMemoryRequirements` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkDeviceImageMemoryRequirements {
    VkStructureType             sType;
    const void*                 pNext;
    const VkImageCreateInfo*    pCreateInfo;
    VkImageAspectFlagBits       planeAspect;
} VkDeviceImageMemoryRequirements;

// Provided by VK_KHR_maintenance4
// Equivalent to VkDeviceImageMemoryRequirements
typedef VkDeviceImageMemoryRequirements VkDeviceImageMemoryRequirementsKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pCreateInfo` is a pointer to a [VkImageCreateInfo](#VkImageCreateInfo) structure
containing parameters affecting creation of the image to query.

* 
`planeAspect` is a [VkImageAspectFlagBits](#VkImageAspectFlagBits) value specifying the
aspect corresponding to the image plane to query.
This parameter is ignored unless
`pCreateInfo->tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), or
`pCreateInfo->flags` has [VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) set.

Valid Usage

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06416) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06416

The `pCreateInfo->pNext` chain **must** not contain a
[VkImageSwapchainCreateInfoKHR](#VkImageSwapchainCreateInfoKHR) structure

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06776) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06776

The `pCreateInfo->pNext` chain **must** not contain a
[VkImageDrmFormatModifierExplicitCreateInfoEXT](#VkImageDrmFormatModifierExplicitCreateInfoEXT) structure

* 
[](#VUID-VkDeviceImageMemoryRequirements-pNext-06996) VUID-VkDeviceImageMemoryRequirements-pNext-06996

Applications also **must** not call
[vkGetDeviceImageMemoryRequirements](#vkGetDeviceImageMemoryRequirements) with a [VkImageCreateInfo](#VkImageCreateInfo)
whose `pNext` chain includes a [VkExternalFormatANDROID](#VkExternalFormatANDROID)
structure with non-zero `externalFormat`

* 
[](#VUID-VkDeviceImageMemoryRequirements-pNext-08962) VUID-VkDeviceImageMemoryRequirements-pNext-08962

Applications also **must** not call
[vkGetDeviceImageMemoryRequirements](#vkGetDeviceImageMemoryRequirements) with a [VkImageCreateInfo](#VkImageCreateInfo)
whose `pNext` chain includes a [VkExternalFormatQNX](#VkExternalFormatQNX) structure
with non-zero `externalFormat`

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06417) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06417

If `pCreateInfo->format` specifies a *multi-planar* format and
`pCreateInfo->flags` has [VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) set then
`planeAspect` **must** not be [VK_IMAGE_ASPECT_NONE_KHR](#VkImageAspectFlagBits)

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06419) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06419

If `pCreateInfo->flags` has [VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) set
and if the `pCreateInfo->tiling` is [VK_IMAGE_TILING_LINEAR](#VkImageTiling) or
[VK_IMAGE_TILING_OPTIMAL](#VkImageTiling), then `planeAspect` **must** be a single
valid [multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06420) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-06420

If `pCreateInfo->tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then `planeAspect`
**must** be a single valid *memory plane* for the image (that is,
`aspectMask` **must** specify a plane index that is less than the
[VkDrmFormatModifierPropertiesEXT](formats.html#VkDrmFormatModifierPropertiesEXT)::`drmFormatModifierPlaneCount`
associated with the image’s `format` and
[VkImageDrmFormatModifierPropertiesEXT](#VkImageDrmFormatModifierPropertiesEXT)::`drmFormatModifier`)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceImageMemoryRequirements-sType-sType) VUID-VkDeviceImageMemoryRequirements-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_IMAGE_MEMORY_REQUIREMENTS](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceImageMemoryRequirements-pNext-pNext) VUID-VkDeviceImageMemoryRequirements-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceImageMemoryRequirements-pCreateInfo-parameter) VUID-VkDeviceImageMemoryRequirements-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkImageCreateInfo](#VkImageCreateInfo) structure

* 
[](#VUID-VkDeviceImageMemoryRequirements-planeAspect-parameter) VUID-VkDeviceImageMemoryRequirements-planeAspect-parameter

 If `planeAspect` is not `0`, `planeAspect` **must** be a valid [VkImageAspectFlagBits](#VkImageAspectFlagBits) value

To determine the memory requirements for a plane of a disjoint image, add a
`VkImagePlaneMemoryRequirementsInfo` structure to the `pNext` chain
of the `VkImageMemoryRequirementsInfo2` structure.

The `VkImagePlaneMemoryRequirementsInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkImagePlaneMemoryRequirementsInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkImageAspectFlagBits    planeAspect;
} VkImagePlaneMemoryRequirementsInfo;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkImagePlaneMemoryRequirementsInfo
typedef VkImagePlaneMemoryRequirementsInfo VkImagePlaneMemoryRequirementsInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`planeAspect` is a [VkImageAspectFlagBits](#VkImageAspectFlagBits) value specifying the
aspect corresponding to the image plane to query.

Valid Usage

* 
[](#VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-02281) VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-02281

If the image’s `tiling` is [VK_IMAGE_TILING_LINEAR](#VkImageTiling) or
[VK_IMAGE_TILING_OPTIMAL](#VkImageTiling), then `planeAspect` **must** be a single
valid [multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-02282) VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-02282

If the image’s `tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then `planeAspect`
**must** be a single valid *memory plane* for the image (that is,
`aspectMask` **must** specify a plane index that is less than the
[VkDrmFormatModifierPropertiesEXT](formats.html#VkDrmFormatModifierPropertiesEXT)::`drmFormatModifierPlaneCount`
associated with the image’s `format` and
[VkImageDrmFormatModifierPropertiesEXT](#VkImageDrmFormatModifierPropertiesEXT)::`drmFormatModifier`)

Valid Usage (Implicit)

* 
[](#VUID-VkImagePlaneMemoryRequirementsInfo-sType-sType) VUID-VkImagePlaneMemoryRequirementsInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_PLANE_MEMORY_REQUIREMENTS_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-parameter) VUID-VkImagePlaneMemoryRequirementsInfo-planeAspect-parameter

 `planeAspect` **must** be a valid [VkImageAspectFlagBits](#VkImageAspectFlagBits) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageMemoryRequirementsInfo2](#VkImageMemoryRequirementsInfo2)

To determine the tile memory allocation requirements of a buffer or image
resource, add a `VkTileMemoryRequirementsQCOM` structure to the
`pNext` chain of the `VkMemoryRequirements2` structure passed as the
`pMemoryRequirements` parameter of [vkGetBufferMemoryRequirements2](#vkGetBufferMemoryRequirements2)
or [vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2), respectively.
The `VkTileMemoryRequirementsQCOM` structure is defined as:

// Provided by VK_QCOM_tile_memory_heap
typedef struct VkTileMemoryRequirementsQCOM {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       size;
    VkDeviceSize       alignment;
} VkTileMemoryRequirementsQCOM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`size` is the size, in bytes, of the tile memory allocation required
for the resource.

* 
`alignment` is the alignment, in bytes, of the offset within the
tile memory allocation required for the resource.

The `size` and `alignment` **must** be used when the resource is bound
to a [VkDeviceMemory](memory.html#VkDeviceMemory) object that was allocated from a
[VkMemoryType](memory.html#VkMemoryType) that has a `heapIndex` that corresponds to a
[VkMemoryHeap](memory.html#VkMemoryHeap) with the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits)
property.

If the resource cannot be bound to tile memory, then `size` and
`alignment` is filled with zero by the implementation.

Valid Usage (Implicit)

* 
[](#VUID-VkTileMemoryRequirementsQCOM-sType-sType) VUID-VkTileMemoryRequirementsQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TILE_MEMORY_REQUIREMENTS_QCOM](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryRequirements2](#VkMemoryRequirements2)

The `VkMemoryRequirements2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkMemoryRequirements2 {
    VkStructureType         sType;
    void*                   pNext;
    VkMemoryRequirements    memoryRequirements;
} VkMemoryRequirements2;

// Provided by VK_KHR_get_memory_requirements2, VK_NV_ray_tracing with VK_KHR_get_memory_requirements2 or VK_VERSION_1_1
// Equivalent to VkMemoryRequirements2
typedef VkMemoryRequirements2 VkMemoryRequirements2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryRequirements` is a [VkMemoryRequirements](#VkMemoryRequirements) structure
describing the memory requirements of the resource.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryRequirements2-sType-sType) VUID-VkMemoryRequirements2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_REQUIREMENTS_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryRequirements2-pNext-pNext) VUID-VkMemoryRequirements2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkMemoryDedicatedRequirements](#VkMemoryDedicatedRequirements) or [VkTileMemoryRequirementsQCOM](#VkTileMemoryRequirementsQCOM)

* 
[](#VUID-VkMemoryRequirements2-sType-unique) VUID-VkMemoryRequirements2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

The `VkMemoryDedicatedRequirements` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkMemoryDedicatedRequirements {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           prefersDedicatedAllocation;
    VkBool32           requiresDedicatedAllocation;
} VkMemoryDedicatedRequirements;

// Provided by VK_KHR_dedicated_allocation
// Equivalent to VkMemoryDedicatedRequirements
typedef VkMemoryDedicatedRequirements VkMemoryDedicatedRequirementsKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`prefersDedicatedAllocation` specifies that the implementation would
prefer a dedicated allocation for this resource.
The application is still free to suballocate the resource but it **may**
get better performance if a dedicated allocation is used.

* 
`requiresDedicatedAllocation` specifies that a dedicated allocation
is required for this resource.

To determine the dedicated allocation requirements of a buffer or image
or tensor
resource, add a [VkMemoryDedicatedRequirements](#VkMemoryDedicatedRequirements) structure to the
`pNext` chain of the [VkMemoryRequirements2](#VkMemoryRequirements2) structure passed as the
`pMemoryRequirements` parameter of [vkGetBufferMemoryRequirements2](#vkGetBufferMemoryRequirements2),
[vkGetTensorMemoryRequirementsARM](#vkGetTensorMemoryRequirementsARM),
[vkGetDeviceBufferMemoryRequirements](#vkGetDeviceBufferMemoryRequirements),
[vkGetDeviceImageMemoryRequirements](#vkGetDeviceImageMemoryRequirements),
or [vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) respectively.

Constraints on the values returned for buffer resources are:

* 
`requiresDedicatedAllocation` **may** be [VK_TRUE](fundamentals.html#VK_TRUE) if the
`pNext` chain of [VkBufferCreateInfo](#VkBufferCreateInfo) for the call to
`vkCreateBuffer` used to create the buffer being queried included a
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo) structure, and any of the handle
types specified in
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo)::`handleTypes` requires
dedicated allocation, as reported by
[vkGetPhysicalDeviceExternalBufferProperties](capabilities.html#vkGetPhysicalDeviceExternalBufferProperties) in
`VkExternalBufferProperties`::`externalMemoryProperties.externalMemoryFeatures`.
Otherwise, `requiresDedicatedAllocation` will be [VK_FALSE](fundamentals.html#VK_FALSE).

* 
When the implementation sets `requiresDedicatedAllocation` to
[VK_TRUE](fundamentals.html#VK_TRUE), it **must** also set `prefersDedicatedAllocation` to
[VK_TRUE](fundamentals.html#VK_TRUE).

* 
If [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](#VkBufferCreateFlagBits) was set in
[VkBufferCreateInfo](#VkBufferCreateInfo)::`flags` when `buffer` was created,
then both `prefersDedicatedAllocation` and
`requiresDedicatedAllocation` will be [VK_FALSE](fundamentals.html#VK_FALSE).

Constraints on the values returned for image resources are:

* 
`requiresDedicatedAllocation` **may** be [VK_TRUE](fundamentals.html#VK_TRUE) if the
`pNext` chain of [VkImageCreateInfo](#VkImageCreateInfo) for the call to
[vkCreateImage](#vkCreateImage) used to create the image being queried included a
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo) structure, and any of the handle
types specified in
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)::`handleTypes` requires
dedicated allocation, as reported by
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) in
`VkExternalImageFormatProperties`::`externalMemoryProperties.externalMemoryFeatures`.

* 
`requiresDedicatedAllocation` **may** be [VK_TRUE](fundamentals.html#VK_TRUE) if the image’s
tiling is [VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling).

* 
`requiresDedicatedAllocation` will
otherwise
be [VK_FALSE](fundamentals.html#VK_FALSE)

* 
If [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](#VkImageCreateFlagBits) was set in
[VkImageCreateInfo](#VkImageCreateInfo)::`flags` when `image` was created, then
both `prefersDedicatedAllocation` and
`requiresDedicatedAllocation` will be [VK_FALSE](fundamentals.html#VK_FALSE).

Constraints on the values returned for tensor resources are:

* 
`requiresDedicatedAllocation` **may** be [VK_TRUE](fundamentals.html#VK_TRUE) if the
`pNext` chain of [VkTensorCreateInfoARM](#VkTensorCreateInfoARM) for the call to
`vkCreateTensorARM` used to create the tensor being queried included
a [VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM) structure, and any of the
handle types specified in
[VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM)::`handleTypes` requires
dedicated allocation, as reported by
[vkGetPhysicalDeviceExternalTensorPropertiesARM](capabilities.html#vkGetPhysicalDeviceExternalTensorPropertiesARM) in
`VkExternalTensorPropertiesARM`::`externalMemoryProperties.externalMemoryFeatures`.

* 
`requiresDedicatedAllocation` will otherwise be [VK_FALSE](fundamentals.html#VK_FALSE).

* 
When the implementation sets `requiresDedicatedAllocation` to
[VK_TRUE](fundamentals.html#VK_TRUE), it **must** also set `prefersDedicatedAllocation` to
[VK_TRUE](fundamentals.html#VK_TRUE).

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryDedicatedRequirements-sType-sType) VUID-VkMemoryDedicatedRequirements-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_DEDICATED_REQUIREMENTS](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryRequirements2](#VkMemoryRequirements2)

To attach memory to a buffer object, call:

// Provided by VK_VERSION_1_0
VkResult vkBindBufferMemory(
    VkDevice                                    device,
    VkBuffer                                    buffer,
    VkDeviceMemory                              memory,
    VkDeviceSize                                memoryOffset);

* 
`device` is the logical device that owns the buffer and memory.

* 
`buffer` is the buffer to be attached to memory.

* 
`memory` is a [VkDeviceMemory](memory.html#VkDeviceMemory) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of `memory`
which is to be bound to the buffer.
The number of bytes returned in the
`VkMemoryRequirements`::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified buffer.

`vkBindBufferMemory` is equivalent to passing the same parameters
through [VkBindBufferMemoryInfo](#VkBindBufferMemoryInfo) to [vkBindBufferMemory2](#vkBindBufferMemory2).

Valid Usage

* 
[](#VUID-vkBindBufferMemory-buffer-07459) VUID-vkBindBufferMemory-buffer-07459

`buffer` **must** not have been bound to a memory object

* 
[](#VUID-vkBindBufferMemory-buffer-01030) VUID-vkBindBufferMemory-buffer-01030

`buffer` **must** not have been created with any sparse memory binding
flags

* 
[](#VUID-vkBindBufferMemory-memoryOffset-01031) VUID-vkBindBufferMemory-memoryOffset-01031

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-vkBindBufferMemory-memory-01035) VUID-vkBindBufferMemory-memory-01035

`memory` **must** have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
`VkMemoryRequirements` structure returned from a call to
`vkGetBufferMemoryRequirements` with `buffer`

* 
[](#VUID-vkBindBufferMemory-None-10739) VUID-vkBindBufferMemory-None-10739

If `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkMemoryRequirements` structure returned from a call
to `vkGetBufferMemoryRequirements` with `buffer`

* 
[](#VUID-vkBindBufferMemory-memory-10740) VUID-vkBindBufferMemory-memory-10740

If `memory` was allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetBufferMemoryRequirements` with `buffer`

* 
[](#VUID-vkBindBufferMemory-None-10741) VUID-vkBindBufferMemory-None-10741

If `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
`size` member of the `VkMemoryRequirements` structure returned
from a call to `vkGetBufferMemoryRequirements` with `buffer`
**must** be less than or equal to the size of `memory` minus
`memoryOffset`

* 
[](#VUID-vkBindBufferMemory-memory-10742) VUID-vkBindBufferMemory-memory-10742

If `memory` was allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set, `size`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetBufferMemoryRequirements` with `buffer` **must** be
less than or equal to the size of `memory` minus `memoryOffset`

* 
[](#VUID-vkBindBufferMemory-buffer-01444) VUID-vkBindBufferMemory-buffer-01444

If `buffer` requires a dedicated allocation (as reported by
[vkGetBufferMemoryRequirements2](#vkGetBufferMemoryRequirements2) in
[VkMemoryDedicatedRequirements](#VkMemoryDedicatedRequirements)::`requiresDedicatedAllocation`
for `buffer`), `memory` **must** have been allocated with
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`buffer` equal to `buffer`

* 
[](#VUID-vkBindBufferMemory-memory-01508) VUID-vkBindBufferMemory-memory-01508

If the `VkMemoryAllocateInfo` provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo) structure in
its `pNext` chain, and
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`buffer` was not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then `buffer` **must** equal
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`buffer`, and
`memoryOffset` **must** be zero

* 
[](#VUID-vkBindBufferMemory-memory-10925) VUID-vkBindBufferMemory-memory-10925

If the `VkMemoryAllocateInfo` provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo) structure in
its `pNext` chain, [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image`
**must** have been [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkBindBufferMemory-None-01898) VUID-vkBindBufferMemory-None-01898

If `buffer` was created with the
[VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits) bit set, the buffer **must** be bound
to a memory object allocated with a memory type that reports
[VK_MEMORY_PROPERTY_PROTECTED_BIT](memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-vkBindBufferMemory-None-01899) VUID-vkBindBufferMemory-None-01899

If `buffer` was created with the
[VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits) bit not set, the buffer **must** not
be bound to a memory object allocated with a memory type that reports
[VK_MEMORY_PROPERTY_PROTECTED_BIT](memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-vkBindBufferMemory-buffer-01038) VUID-vkBindBufferMemory-buffer-01038

If `buffer` was created with
[VkDedicatedAllocationBufferCreateInfoNV](#VkDedicatedAllocationBufferCreateInfoNV)::`dedicatedAllocation`
equal to [VK_TRUE](fundamentals.html#VK_TRUE), `memory` **must** have been allocated with
[VkDedicatedAllocationMemoryAllocateInfoNV](memory.html#VkDedicatedAllocationMemoryAllocateInfoNV)::`buffer` equal to a
buffer handle created with identical creation parameters to `buffer`
and `memoryOffset` **must** be zero

* 
[](#VUID-vkBindBufferMemory-apiVersion-07920) VUID-vkBindBufferMemory-apiVersion-07920

    If
    the [VK_KHR_dedicated_allocation](../appendices/extensions.html#VK_KHR_dedicated_allocation) extension is not enabled,
    [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than Vulkan
    1.1,
and
    `buffer` was not created with
    [VkDedicatedAllocationBufferCreateInfoNV](#VkDedicatedAllocationBufferCreateInfoNV)::`dedicatedAllocation`
    equal to [VK_TRUE](fundamentals.html#VK_TRUE), `memory` **must** not have been allocated
    dedicated for a specific buffer or image

* 
[](#VUID-vkBindBufferMemory-memory-02726) VUID-vkBindBufferMemory-memory-02726

If the value of [VkExportMemoryAllocateInfo](memory.html#VkExportMemoryAllocateInfo)::`handleTypes` used
to allocate `memory` is not `0`, it **must** include at least one of
the handles set in
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo)::`handleTypes` when
`buffer` was created

* 
[](#VUID-vkBindBufferMemory-memory-02985) VUID-vkBindBufferMemory-memory-02985

If `memory` was allocated by a memory import operation,
that is not [VkImportAndroidHardwareBufferInfoANDROID](memory.html#VkImportAndroidHardwareBufferInfoANDROID) with a
non-`NULL` `buffer` value,
the external handle type of the imported memory **must** also have been set
in [VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo)::`handleTypes` when
`buffer` was created

* 
[](#VUID-vkBindBufferMemory-memory-02986) VUID-vkBindBufferMemory-memory-02986

If `memory` was allocated with the
[VkImportAndroidHardwareBufferInfoANDROID](memory.html#VkImportAndroidHardwareBufferInfoANDROID) memory import operation
with a non-`NULL` `buffer` value,
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
**must** also have been set in
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo)::`handleTypes` when
`buffer` was created

* 
[](#VUID-vkBindBufferMemory-bufferDeviceAddress-03339) VUID-vkBindBufferMemory-bufferDeviceAddress-03339

If the
[VkPhysicalDeviceBufferDeviceAddressFeatures](features.html#VkPhysicalDeviceBufferDeviceAddressFeatures)::`bufferDeviceAddress`
feature is enabled and `buffer` was created with the
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits) usage flag set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-vkBindBufferMemory-bufferDeviceAddressCaptureReplay-09200) VUID-vkBindBufferMemory-bufferDeviceAddressCaptureReplay-09200

If the
[VkPhysicalDeviceBufferDeviceAddressFeatures](features.html#VkPhysicalDeviceBufferDeviceAddressFeatures)::`bufferDeviceAddressCaptureReplay`
feature is enabled and `buffer` was created with the
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-vkBindBufferMemory-buffer-06408) VUID-vkBindBufferMemory-buffer-06408

If `buffer` was created with
[VkBufferCollectionBufferCreateInfoFUCHSIA](#VkBufferCollectionBufferCreateInfoFUCHSIA) chained to
[VkBufferCreateInfo](#VkBufferCreateInfo)::`pNext`, `memory` **must** be allocated
with a [VkImportMemoryBufferCollectionFUCHSIA](#VkImportMemoryBufferCollectionFUCHSIA) chained to
[VkMemoryAllocateInfo](memory.html#VkMemoryAllocateInfo)::`pNext`

* 
[](#VUID-vkBindBufferMemory-descriptorBufferCaptureReplay-08112) VUID-vkBindBufferMemory-descriptorBufferCaptureReplay-08112

If the `buffer` was created with the
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkBufferCreateFlagBits) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-vkBindBufferMemory-buffer-09201) VUID-vkBindBufferMemory-buffer-09201

If the `buffer` was created with the
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkBufferCreateFlagBits) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-vkBindBufferMemory-buffer-11408) VUID-vkBindBufferMemory-buffer-11408

If the `buffer` was created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](#VkBufferUsageFlagBits) or
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkBufferUsageFlagBits2KHR) bit set, `memory`
**must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

Valid Usage (Implicit)

* 
[](#VUID-vkBindBufferMemory-device-parameter) VUID-vkBindBufferMemory-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkBindBufferMemory-buffer-parameter) VUID-vkBindBufferMemory-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](#VkBuffer) handle

* 
[](#VUID-vkBindBufferMemory-memory-parameter) VUID-vkBindBufferMemory-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](memory.html#VkDeviceMemory) handle

* 
[](#VUID-vkBindBufferMemory-buffer-parent) VUID-vkBindBufferMemory-buffer-parent

 `buffer` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkBindBufferMemory-memory-parent) VUID-vkBindBufferMemory-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `buffer` **must** be externally synchronized

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To attach memory to buffer objects for one or more buffers at a time, call:

// Provided by VK_VERSION_1_1
VkResult vkBindBufferMemory2(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindBufferMemoryInfo*               pBindInfos);

// Provided by VK_KHR_bind_memory2
// Equivalent to vkBindBufferMemory2
VkResult vkBindBufferMemory2KHR(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindBufferMemoryInfo*               pBindInfos);

* 
`device` is the logical device that owns the buffers and memory.

* 
`bindInfoCount` is the number of elements in `pBindInfos`.

* 
`pBindInfos` is a pointer to an array of `bindInfoCount`
[VkBindBufferMemoryInfo](#VkBindBufferMemoryInfo) structures describing buffers and memory to
bind.

On some implementations, it **may** be more efficient to batch memory bindings
into a single command.

If the [`maintenance6`](features.html#features-maintenance6) feature is enabled,
this command **must** attempt to perform all of the memory binding operations
described by `pBindInfos`, and **must** not early exit on the first
failure.

If any of the memory binding operations described by `pBindInfos` fail,
the [VkResult](fundamentals.html#VkResult) returned by this command **must** be the return value of any
one of the memory binding operations which did not return [VK_SUCCESS](fundamentals.html#VkResult).

|  | If the `vkBindBufferMemory2` command failed,
| --- | --- |
[VkBindMemoryStatus](#VkBindMemoryStatus) structures were not included in the `pNext`
chains of each element of `pBindInfos`,
and `bindInfoCount` was greater than one, then the buffers referenced by
`pBindInfos` will be in an indeterminate state, and must not be used.

Applications should destroy these buffers. |

Valid Usage (Implicit)

* 
[](#VUID-vkBindBufferMemory2-device-parameter) VUID-vkBindBufferMemory2-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkBindBufferMemory2-pBindInfos-parameter) VUID-vkBindBufferMemory2-pBindInfos-parameter

 `pBindInfos` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindBufferMemoryInfo](#VkBindBufferMemoryInfo) structures

* 
[](#VUID-vkBindBufferMemory2-bindInfoCount-arraylength) VUID-vkBindBufferMemory2-bindInfoCount-arraylength

 `bindInfoCount` **must** be greater than `0`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

`VkBindBufferMemoryInfo` contains members corresponding to the
parameters of [vkBindBufferMemory](#vkBindBufferMemory).

The `VkBindBufferMemoryInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBindBufferMemoryInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           buffer;
    VkDeviceMemory     memory;
    VkDeviceSize       memoryOffset;
} VkBindBufferMemoryInfo;

// Provided by VK_KHR_bind_memory2
// Equivalent to VkBindBufferMemoryInfo
typedef VkBindBufferMemoryInfo VkBindBufferMemoryInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is the buffer to be attached to memory.

* 
`memory` is a [VkDeviceMemory](memory.html#VkDeviceMemory) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of `memory`
which is to be bound to the buffer.
The number of bytes returned in the
`VkMemoryRequirements`::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified buffer.

Valid Usage

* 
[](#VUID-VkBindBufferMemoryInfo-buffer-07459) VUID-VkBindBufferMemoryInfo-buffer-07459

`buffer` **must** not have been bound to a memory object

* 
[](#VUID-VkBindBufferMemoryInfo-buffer-01030) VUID-VkBindBufferMemoryInfo-buffer-01030

`buffer` **must** not have been created with any sparse memory binding
flags

* 
[](#VUID-VkBindBufferMemoryInfo-memoryOffset-01031) VUID-VkBindBufferMemoryInfo-memoryOffset-01031

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkBindBufferMemoryInfo-memory-01035) VUID-VkBindBufferMemoryInfo-memory-01035

`memory` **must** have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
`VkMemoryRequirements` structure returned from a call to
`vkGetBufferMemoryRequirements` with `buffer`

* 
[](#VUID-VkBindBufferMemoryInfo-None-10739) VUID-VkBindBufferMemoryInfo-None-10739

If `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkMemoryRequirements` structure returned from a call
to `vkGetBufferMemoryRequirements` with `buffer`

* 
[](#VUID-VkBindBufferMemoryInfo-memory-10740) VUID-VkBindBufferMemoryInfo-memory-10740

If `memory` was allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetBufferMemoryRequirements` with `buffer`

* 
[](#VUID-VkBindBufferMemoryInfo-None-10741) VUID-VkBindBufferMemoryInfo-None-10741

If `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
`size` member of the `VkMemoryRequirements` structure returned
from a call to `vkGetBufferMemoryRequirements` with `buffer`
**must** be less than or equal to the size of `memory` minus
`memoryOffset`

* 
[](#VUID-VkBindBufferMemoryInfo-memory-10742) VUID-VkBindBufferMemoryInfo-memory-10742

If `memory` was allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set, `size`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetBufferMemoryRequirements` with `buffer` **must** be
less than or equal to the size of `memory` minus `memoryOffset`

* 
[](#VUID-VkBindBufferMemoryInfo-buffer-01444) VUID-VkBindBufferMemoryInfo-buffer-01444

If `buffer` requires a dedicated allocation (as reported by
[vkGetBufferMemoryRequirements2](#vkGetBufferMemoryRequirements2) in
[VkMemoryDedicatedRequirements](#VkMemoryDedicatedRequirements)::`requiresDedicatedAllocation`
for `buffer`), `memory` **must** have been allocated with
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`buffer` equal to `buffer`

* 
[](#VUID-VkBindBufferMemoryInfo-memory-01508) VUID-VkBindBufferMemoryInfo-memory-01508

If the `VkMemoryAllocateInfo` provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo) structure in
its `pNext` chain, and
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`buffer` was not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then `buffer` **must** equal
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`buffer`, and
`memoryOffset` **must** be zero

* 
[](#VUID-VkBindBufferMemoryInfo-memory-10925) VUID-VkBindBufferMemoryInfo-memory-10925

If the `VkMemoryAllocateInfo` provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo) structure in
its `pNext` chain, [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image`
**must** have been [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkBindBufferMemoryInfo-None-01898) VUID-VkBindBufferMemoryInfo-None-01898

If `buffer` was created with the
[VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits) bit set, the buffer **must** be bound
to a memory object allocated with a memory type that reports
[VK_MEMORY_PROPERTY_PROTECTED_BIT](memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-VkBindBufferMemoryInfo-None-01899) VUID-VkBindBufferMemoryInfo-None-01899

If `buffer` was created with the
[VK_BUFFER_CREATE_PROTECTED_BIT](#VkBufferCreateFlagBits) bit not set, the buffer **must** not
be bound to a memory object allocated with a memory type that reports
[VK_MEMORY_PROPERTY_PROTECTED_BIT](memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-VkBindBufferMemoryInfo-buffer-01038) VUID-VkBindBufferMemoryInfo-buffer-01038

If `buffer` was created with
[VkDedicatedAllocationBufferCreateInfoNV](#VkDedicatedAllocationBufferCreateInfoNV)::`dedicatedAllocation`
equal to [VK_TRUE](fundamentals.html#VK_TRUE), `memory` **must** have been allocated with
[VkDedicatedAllocationMemoryAllocateInfoNV](memory.html#VkDedicatedAllocationMemoryAllocateInfoNV)::`buffer` equal to a
buffer handle created with identical creation parameters to `buffer`
and `memoryOffset` **must** be zero

* 
[](#VUID-VkBindBufferMemoryInfo-apiVersion-07920) VUID-VkBindBufferMemoryInfo-apiVersion-07920

    If
    the [VK_KHR_dedicated_allocation](../appendices/extensions.html#VK_KHR_dedicated_allocation) extension is not enabled,
    [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than Vulkan
    1.1,
and
    `buffer` was not created with
    [VkDedicatedAllocationBufferCreateInfoNV](#VkDedicatedAllocationBufferCreateInfoNV)::`dedicatedAllocation`
    equal to [VK_TRUE](fundamentals.html#VK_TRUE), `memory` **must** not have been allocated
    dedicated for a specific buffer or image

* 
[](#VUID-VkBindBufferMemoryInfo-memory-02726) VUID-VkBindBufferMemoryInfo-memory-02726

If the value of [VkExportMemoryAllocateInfo](memory.html#VkExportMemoryAllocateInfo)::`handleTypes` used
to allocate `memory` is not `0`, it **must** include at least one of
the handles set in
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo)::`handleTypes` when
`buffer` was created

* 
[](#VUID-VkBindBufferMemoryInfo-memory-02985) VUID-VkBindBufferMemoryInfo-memory-02985

If `memory` was allocated by a memory import operation,
that is not [VkImportAndroidHardwareBufferInfoANDROID](memory.html#VkImportAndroidHardwareBufferInfoANDROID) with a
non-`NULL` `buffer` value,
the external handle type of the imported memory **must** also have been set
in [VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo)::`handleTypes` when
`buffer` was created

* 
[](#VUID-VkBindBufferMemoryInfo-memory-02986) VUID-VkBindBufferMemoryInfo-memory-02986

If `memory` was allocated with the
[VkImportAndroidHardwareBufferInfoANDROID](memory.html#VkImportAndroidHardwareBufferInfoANDROID) memory import operation
with a non-`NULL` `buffer` value,
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
**must** also have been set in
[VkExternalMemoryBufferCreateInfo](#VkExternalMemoryBufferCreateInfo)::`handleTypes` when
`buffer` was created

* 
[](#VUID-VkBindBufferMemoryInfo-bufferDeviceAddress-03339) VUID-VkBindBufferMemoryInfo-bufferDeviceAddress-03339

If the
[VkPhysicalDeviceBufferDeviceAddressFeatures](features.html#VkPhysicalDeviceBufferDeviceAddressFeatures)::`bufferDeviceAddress`
feature is enabled and `buffer` was created with the
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](#VkBufferUsageFlagBits) usage flag set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-VkBindBufferMemoryInfo-bufferDeviceAddressCaptureReplay-09200) VUID-VkBindBufferMemoryInfo-bufferDeviceAddressCaptureReplay-09200

If the
[VkPhysicalDeviceBufferDeviceAddressFeatures](features.html#VkPhysicalDeviceBufferDeviceAddressFeatures)::`bufferDeviceAddressCaptureReplay`
feature is enabled and `buffer` was created with the
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkBufferCreateFlagBits) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-VkBindBufferMemoryInfo-buffer-06408) VUID-VkBindBufferMemoryInfo-buffer-06408

If `buffer` was created with
[VkBufferCollectionBufferCreateInfoFUCHSIA](#VkBufferCollectionBufferCreateInfoFUCHSIA) chained to
[VkBufferCreateInfo](#VkBufferCreateInfo)::`pNext`, `memory` **must** be allocated
with a [VkImportMemoryBufferCollectionFUCHSIA](#VkImportMemoryBufferCollectionFUCHSIA) chained to
[VkMemoryAllocateInfo](memory.html#VkMemoryAllocateInfo)::`pNext`

* 
[](#VUID-VkBindBufferMemoryInfo-descriptorBufferCaptureReplay-08112) VUID-VkBindBufferMemoryInfo-descriptorBufferCaptureReplay-08112

If the `buffer` was created with the
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkBufferCreateFlagBits) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-VkBindBufferMemoryInfo-buffer-09201) VUID-VkBindBufferMemoryInfo-buffer-09201

If the `buffer` was created with the
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](#VkBufferCreateFlagBits) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-VkBindBufferMemoryInfo-buffer-11408) VUID-VkBindBufferMemoryInfo-buffer-11408

If the `buffer` was created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](#VkBufferUsageFlagBits) or
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](#VkBufferUsageFlagBits2KHR) bit set, `memory`
**must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-VkBindBufferMemoryInfo-pNext-01605) VUID-VkBindBufferMemoryInfo-pNext-01605

If the `pNext` chain includes a
[VkBindBufferMemoryDeviceGroupInfo](#VkBindBufferMemoryDeviceGroupInfo) structure, all instances of
`memory` specified by
[VkBindBufferMemoryDeviceGroupInfo](#VkBindBufferMemoryDeviceGroupInfo)::`pDeviceIndices` **must** have
been allocated

Valid Usage (Implicit)

* 
[](#VUID-VkBindBufferMemoryInfo-sType-sType) VUID-VkBindBufferMemoryInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindBufferMemoryInfo-pNext-pNext) VUID-VkBindBufferMemoryInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBindBufferMemoryDeviceGroupInfo](#VkBindBufferMemoryDeviceGroupInfo) or [VkBindMemoryStatus](#VkBindMemoryStatus)

* 
[](#VUID-VkBindBufferMemoryInfo-sType-unique) VUID-VkBindBufferMemoryInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBindBufferMemoryInfo-buffer-parameter) VUID-VkBindBufferMemoryInfo-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](#VkBuffer) handle

* 
[](#VUID-VkBindBufferMemoryInfo-memory-parameter) VUID-VkBindBufferMemoryInfo-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](memory.html#VkDeviceMemory) handle

* 
[](#VUID-VkBindBufferMemoryInfo-commonparent) VUID-VkBindBufferMemoryInfo-commonparent

 Both of `buffer`, and `memory` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `buffer` **must** be externally synchronized

The `VkBindBufferMemoryDeviceGroupInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBindBufferMemoryDeviceGroupInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           deviceIndexCount;
    const uint32_t*    pDeviceIndices;
} VkBindBufferMemoryDeviceGroupInfo;

// Provided by VK_KHR_bind_memory2 with VK_KHR_device_group
// Equivalent to VkBindBufferMemoryDeviceGroupInfo
typedef VkBindBufferMemoryDeviceGroupInfo VkBindBufferMemoryDeviceGroupInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceIndexCount` is the number of elements in
`pDeviceIndices`.

* 
`pDeviceIndices` is a pointer to an array of device indices.

If the `pNext` chain of [VkBindBufferMemoryInfo](#VkBindBufferMemoryInfo) includes a
`VkBindBufferMemoryDeviceGroupInfo` structure, then that structure
determines how memory is bound to buffers across multiple devices in a
device group.

If `deviceIndexCount` is greater than zero, then on device index i
the buffer is attached to the instance of `memory` on the physical
device with device index `pDeviceIndices`[i].

If `deviceIndexCount` is zero and `memory` comes from a memory heap
with the [VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](memory.html#VkMemoryHeapFlagBits) bit set, then it is as if
`pDeviceIndices` contains consecutive indices from zero to the number of
physical devices in the logical device, minus one.
In other words, by default each physical device attaches to its own instance
of `memory`.

If `deviceIndexCount` is zero and `memory` comes from a memory heap
without the [VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](memory.html#VkMemoryHeapFlagBits) bit set, then it is as
if `pDeviceIndices` contains an array of zeros.
In other words, by default each physical device attaches to instance zero.

Valid Usage

* 
[](#VUID-VkBindBufferMemoryDeviceGroupInfo-deviceIndexCount-01606) VUID-VkBindBufferMemoryDeviceGroupInfo-deviceIndexCount-01606

`deviceIndexCount` **must** either be zero or equal to the number of
physical devices in the logical device

* 
[](#VUID-VkBindBufferMemoryDeviceGroupInfo-pDeviceIndices-01607) VUID-VkBindBufferMemoryDeviceGroupInfo-pDeviceIndices-01607

All elements of `pDeviceIndices` **must** be valid device indices

Valid Usage (Implicit)

* 
[](#VUID-VkBindBufferMemoryDeviceGroupInfo-sType-sType) VUID-VkBindBufferMemoryDeviceGroupInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_DEVICE_GROUP_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindBufferMemoryDeviceGroupInfo-pDeviceIndices-parameter) VUID-VkBindBufferMemoryDeviceGroupInfo-pDeviceIndices-parameter

 If `deviceIndexCount` is not `0`, `pDeviceIndices` **must** be a valid pointer to an array of `deviceIndexCount` `uint32_t` values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindBufferMemoryInfo](#VkBindBufferMemoryInfo)

The `VkBindMemoryStatus` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkBindMemoryStatus {
    VkStructureType    sType;
    const void*        pNext;
    VkResult*          pResult;
} VkBindMemoryStatus;

// Provided by VK_KHR_maintenance6
// Equivalent to VkBindMemoryStatus
typedef VkBindMemoryStatus VkBindMemoryStatusKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pResult` is a pointer to a [VkResult](fundamentals.html#VkResult) value.

If the `pNext` chain of [VkBindBufferMemoryInfo](#VkBindBufferMemoryInfo) or
[VkBindImageMemoryInfo](#VkBindImageMemoryInfo) includes a `VkBindMemoryStatus` structure,
then the `VkBindMemoryStatus`::`pResult` will be populated with a
value describing the result of the corresponding memory binding operation.

Valid Usage (Implicit)

* 
[](#VUID-VkBindMemoryStatus-sType-sType) VUID-VkBindMemoryStatus-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_MEMORY_STATUS](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindMemoryStatus-pResult-parameter) VUID-VkBindMemoryStatus-pResult-parameter

 `pResult` **must** be a valid pointer to a [VkResult](fundamentals.html#VkResult) value

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindBufferMemoryInfo](#VkBindBufferMemoryInfo)

* 
[VkBindImageMemoryInfo](#VkBindImageMemoryInfo)

To attach memory to a `VkImage` object created without the
[VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) set, call:

// Provided by VK_VERSION_1_0
VkResult vkBindImageMemory(
    VkDevice                                    device,
    VkImage                                     image,
    VkDeviceMemory                              memory,
    VkDeviceSize                                memoryOffset);

* 
`device` is the logical device that owns the image and memory.

* 
`image` is the image.

* 
`memory` is the [VkDeviceMemory](memory.html#VkDeviceMemory) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of `memory`
which is to be bound to the image.
The number of bytes returned in the
`VkMemoryRequirements`::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified image.

`vkBindImageMemory` is equivalent to passing the same parameters through
[VkBindImageMemoryInfo](#VkBindImageMemoryInfo) to [vkBindImageMemory2](#vkBindImageMemory2).

Valid Usage

* 
[](#VUID-vkBindImageMemory-image-07460) VUID-vkBindImageMemory-image-07460

`image` **must** not have been bound to a memory object

* 
[](#VUID-vkBindImageMemory-image-01045) VUID-vkBindImageMemory-image-01045

`image` **must** not have been created with any sparse memory binding
flags

* 
[](#VUID-vkBindImageMemory-memoryOffset-01046) VUID-vkBindImageMemory-memoryOffset-01046

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-vkBindImageMemory-image-01445) VUID-vkBindImageMemory-image-01445

If `image` requires a dedicated allocation (as reported by
[vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) in
[VkMemoryDedicatedRequirements](#VkMemoryDedicatedRequirements)::`requiresDedicatedAllocation`
for `image`), `memory` **must** have been created with
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image` equal to `image`

* 
[](#VUID-vkBindImageMemory-memory-02628) VUID-vkBindImageMemory-memory-02628

If
the [    `dedicatedAllocationImageAliasing`](features.html#features-dedicatedAllocationImageAliasing) feature is not enabled, and
the `VkMemoryAllocateInfo` provided when `memory` was allocated
included a [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo) structure in its
`pNext` chain, and [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image`
was not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then `image` **must** equal
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image` and `memoryOffset`
**must** be zero

* 
[](#VUID-vkBindImageMemory-memory-02629) VUID-vkBindImageMemory-memory-02629

If the [    `dedicatedAllocationImageAliasing`](features.html#features-dedicatedAllocationImageAliasing) feature is enabled, and the
`VkMemoryAllocateInfo` provided when `memory` was allocated
included a [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo) structure in its
`pNext` chain, and [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image`
was not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then `memoryOffset` **must** be zero, and
`image` **must** be either equal to
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image` or an image that was
created using the same parameters in [VkImageCreateInfo](#VkImageCreateInfo), with the
exception that `extent` and `arrayLayers` **may** differ subject to
the following restrictions: every dimension in the `extent`
parameter of the image being bound **must** be equal to or smaller than the
original image for which the allocation was created; and the
`arrayLayers` parameter of the image being bound **must** be equal to
or smaller than the original image for which the allocation was created

* 
[](#VUID-vkBindImageMemory-memory-10926) VUID-vkBindImageMemory-memory-10926

If the `VkMemoryAllocateInfo` provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo) structure in
its `pNext` chain, [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`buffer`
**must** have been [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-vkBindImageMemory-None-01901) VUID-vkBindImageMemory-None-01901

If image was created with the [VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits) bit
set, the image **must** be bound to a memory object allocated with a memory
type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-vkBindImageMemory-None-01902) VUID-vkBindImageMemory-None-01902

If image was created with the [VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits) bit
not set, the image **must** not be bound to a memory object created with a
memory type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-vkBindImageMemory-image-01050) VUID-vkBindImageMemory-image-01050

If `image` was created with
[VkDedicatedAllocationImageCreateInfoNV](#VkDedicatedAllocationImageCreateInfoNV)::`dedicatedAllocation`
equal to [VK_TRUE](fundamentals.html#VK_TRUE), `memory` **must** have been created with
[VkDedicatedAllocationMemoryAllocateInfoNV](memory.html#VkDedicatedAllocationMemoryAllocateInfoNV)::`image` equal to an
image handle created with identical creation parameters to `image`
and `memoryOffset` **must** be zero

* 
[](#VUID-vkBindImageMemory-apiVersion-07921) VUID-vkBindImageMemory-apiVersion-07921

    If
    the [VK_KHR_dedicated_allocation](../appendices/extensions.html#VK_KHR_dedicated_allocation) extension is not enabled,
    [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than Vulkan
    1.1,
and
    `image` was not created with
    [VkDedicatedAllocationImageCreateInfoNV](#VkDedicatedAllocationImageCreateInfoNV)::`dedicatedAllocation`
    equal to [VK_TRUE](fundamentals.html#VK_TRUE), `memory` **must** not have been allocated
    dedicated for a specific buffer or image

* 
[](#VUID-vkBindImageMemory-memory-02728) VUID-vkBindImageMemory-memory-02728

If the value of [VkExportMemoryAllocateInfo](memory.html#VkExportMemoryAllocateInfo)::`handleTypes` used
to allocate `memory` is not `0`, it **must** include at least one of
the handles set in
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)::`handleTypes` when
`image` was created

* 
[](#VUID-vkBindImageMemory-memory-02989) VUID-vkBindImageMemory-memory-02989

If `memory` was created by a memory import operation,
that is not [VkImportAndroidHardwareBufferInfoANDROID](memory.html#VkImportAndroidHardwareBufferInfoANDROID) with a
non-`NULL` `buffer` value,
the external handle type of the imported memory **must** also have been set
in [VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)::`handleTypes` when
`image` was created

* 
[](#VUID-vkBindImageMemory-memory-02990) VUID-vkBindImageMemory-memory-02990

If `memory` was created with the
[VkImportAndroidHardwareBufferInfoANDROID](memory.html#VkImportAndroidHardwareBufferInfoANDROID) memory import operation
with a non-`NULL` `buffer` value,
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
**must** also have been set in
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)::`handleTypes` when
`image` was created

* 
[](#VUID-vkBindImageMemory-image-08113) VUID-vkBindImageMemory-image-08113

If the `image` was created with the
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-vkBindImageMemory-image-09202) VUID-vkBindImageMemory-image-09202

If the `image` was created with the
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-vkBindImageMemory-image-01608) VUID-vkBindImageMemory-image-01608

`image` **must** not have been created with the
[VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) set

* 
[](#VUID-vkBindImageMemory-memory-01047) VUID-vkBindImageMemory-memory-01047

`memory` **must** have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
`VkMemoryRequirements` structure returned from a call to
[vkGetImageMemoryRequirements](#vkGetImageMemoryRequirements) with `image`

* 
[](#VUID-vkBindImageMemory-None-10735) VUID-vkBindImageMemory-None-10735

If `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkMemoryRequirements` structure returned from a call
to [vkGetImageMemoryRequirements](#vkGetImageMemoryRequirements) with `image`

* 
[](#VUID-vkBindImageMemory-memory-10736) VUID-vkBindImageMemory-memory-10736

If `memory` was allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetImageMemoryRequirements2` with `image`

* 
[](#VUID-vkBindImageMemory-None-10737) VUID-vkBindImageMemory-None-10737

If `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
`size` member of the `VkMemoryRequirements` structure returned
from a call to `vkGetImageMemoryRequirements` with `image` **must**
be less than or equal to the size of `memory` minus
`memoryOffset`

* 
[](#VUID-vkBindImageMemory-memory-10738) VUID-vkBindImageMemory-memory-10738

If `memory` was allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set, `size`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetImageMemoryRequirements2` with `image` **must** be
less than or equal to the size of `memory` minus `memoryOffset`

* 
[](#VUID-vkBindImageMemory-image-06392) VUID-vkBindImageMemory-image-06392

If `image` was created with
[VkBufferCollectionImageCreateInfoFUCHSIA](#VkBufferCollectionImageCreateInfoFUCHSIA) chained to
[VkImageCreateInfo](#VkImageCreateInfo)::`pNext`, `memory` **must** be allocated
with a [VkImportMemoryBufferCollectionFUCHSIA](#VkImportMemoryBufferCollectionFUCHSIA) chained to
[VkMemoryAllocateInfo](memory.html#VkMemoryAllocateInfo)::`pNext`

Valid Usage (Implicit)

* 
[](#VUID-vkBindImageMemory-device-parameter) VUID-vkBindImageMemory-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkBindImageMemory-image-parameter) VUID-vkBindImageMemory-image-parameter

 `image` **must** be a valid [VkImage](#VkImage) handle

* 
[](#VUID-vkBindImageMemory-memory-parameter) VUID-vkBindImageMemory-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](memory.html#VkDeviceMemory) handle

* 
[](#VUID-vkBindImageMemory-image-parent) VUID-vkBindImageMemory-image-parent

 `image` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkBindImageMemory-memory-parent) VUID-vkBindImageMemory-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `image` **must** be externally synchronized

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To attach memory to image objects for one or more images at a time, call:

// Provided by VK_VERSION_1_1
VkResult vkBindImageMemory2(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindImageMemoryInfo*                pBindInfos);

// Provided by VK_KHR_bind_memory2
// Equivalent to vkBindImageMemory2
VkResult vkBindImageMemory2KHR(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindImageMemoryInfo*                pBindInfos);

* 
`device` is the logical device that owns the images and memory.

* 
`bindInfoCount` is the number of elements in `pBindInfos`.

* 
`pBindInfos` is a pointer to an array of [VkBindImageMemoryInfo](#VkBindImageMemoryInfo)
structures, describing images and memory to bind.

On some implementations, it **may** be more efficient to batch memory bindings
into a single command.

If the [`maintenance6`](features.html#features-maintenance6) feature is enabled,
this command **must** attempt to perform all of the memory binding operations
described by `pBindInfos`, and **must** not early exit on the first
failure.

If any of the memory binding operations described by `pBindInfos` fail,
the [VkResult](fundamentals.html#VkResult) returned by this command **must** be the return value of any
one of the memory binding operations which did not return [VK_SUCCESS](fundamentals.html#VkResult).

|  | If the `vkBindImageMemory2` command failed,
| --- | --- |
[VkBindMemoryStatus](#VkBindMemoryStatus) structures were not included in the `pNext`
chains of each element of `pBindInfos`,
and `bindInfoCount` was greater than one, then the images referenced by
`pBindInfos` will be in an indeterminate state, and must not be used.

Applications should destroy these images. |

Valid Usage

* 
[](#VUID-vkBindImageMemory2-pBindInfos-02858) VUID-vkBindImageMemory2-pBindInfos-02858

If any [VkBindImageMemoryInfo](#VkBindImageMemoryInfo)::`image` was created with
[VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) then all planes of
[VkBindImageMemoryInfo](#VkBindImageMemoryInfo)::`image` **must** be bound individually in
separate `pBindInfos`

* 
[](#VUID-vkBindImageMemory2-pBindInfos-04006) VUID-vkBindImageMemory2-pBindInfos-04006

`pBindInfos` **must** not refer to the same image subresource more than
once

Valid Usage (Implicit)

* 
[](#VUID-vkBindImageMemory2-device-parameter) VUID-vkBindImageMemory2-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkBindImageMemory2-pBindInfos-parameter) VUID-vkBindImageMemory2-pBindInfos-parameter

 `pBindInfos` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindImageMemoryInfo](#VkBindImageMemoryInfo) structures

* 
[](#VUID-vkBindImageMemory2-bindInfoCount-arraylength) VUID-vkBindImageMemory2-bindInfoCount-arraylength

 `bindInfoCount` **must** be greater than `0`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

`VkBindImageMemoryInfo` contains members corresponding to the parameters
of [vkBindImageMemory](#vkBindImageMemory).

The `VkBindImageMemoryInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBindImageMemoryInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
    VkDeviceMemory     memory;
    VkDeviceSize       memoryOffset;
} VkBindImageMemoryInfo;

// Provided by VK_KHR_bind_memory2
// Equivalent to VkBindImageMemoryInfo
typedef VkBindImageMemoryInfo VkBindImageMemoryInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is the image to be attached to memory.

* 
`memory` is a [VkDeviceMemory](memory.html#VkDeviceMemory) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of `memory`
which is to be bound to the image.
The number of bytes returned in the
`VkMemoryRequirements`::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified image.

Valid Usage

* 
[](#VUID-VkBindImageMemoryInfo-image-07460) VUID-VkBindImageMemoryInfo-image-07460

`image` **must** not have been bound to a memory object

* 
[](#VUID-VkBindImageMemoryInfo-image-01045) VUID-VkBindImageMemoryInfo-image-01045

`image` **must** not have been created with any sparse memory binding
flags

* 
[](#VUID-VkBindImageMemoryInfo-memoryOffset-01046) VUID-VkBindImageMemoryInfo-memoryOffset-01046

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkBindImageMemoryInfo-image-01445) VUID-VkBindImageMemoryInfo-image-01445

If `image` requires a dedicated allocation (as reported by
[vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) in
[VkMemoryDedicatedRequirements](#VkMemoryDedicatedRequirements)::`requiresDedicatedAllocation`
for `image`), `memory` **must** have been created with
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image` equal to `image`

* 
[](#VUID-VkBindImageMemoryInfo-memory-02628) VUID-VkBindImageMemoryInfo-memory-02628

If
the [    `dedicatedAllocationImageAliasing`](features.html#features-dedicatedAllocationImageAliasing) feature is not enabled, and
the `VkMemoryAllocateInfo` provided when `memory` was allocated
included a [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo) structure in its
`pNext` chain, and [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image`
was not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then `image` **must** equal
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image` and `memoryOffset`
**must** be zero

* 
[](#VUID-VkBindImageMemoryInfo-memory-02629) VUID-VkBindImageMemoryInfo-memory-02629

If the [    `dedicatedAllocationImageAliasing`](features.html#features-dedicatedAllocationImageAliasing) feature is enabled, and the
`VkMemoryAllocateInfo` provided when `memory` was allocated
included a [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo) structure in its
`pNext` chain, and [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image`
was not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then `memoryOffset` **must** be zero, and
`image` **must** be either equal to
[VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`image` or an image that was
created using the same parameters in [VkImageCreateInfo](#VkImageCreateInfo), with the
exception that `extent` and `arrayLayers` **may** differ subject to
the following restrictions: every dimension in the `extent`
parameter of the image being bound **must** be equal to or smaller than the
original image for which the allocation was created; and the
`arrayLayers` parameter of the image being bound **must** be equal to
or smaller than the original image for which the allocation was created

* 
[](#VUID-VkBindImageMemoryInfo-memory-10926) VUID-VkBindImageMemoryInfo-memory-10926

If the `VkMemoryAllocateInfo` provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo) structure in
its `pNext` chain, [VkMemoryDedicatedAllocateInfo](memory.html#VkMemoryDedicatedAllocateInfo)::`buffer`
**must** have been [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkBindImageMemoryInfo-None-01901) VUID-VkBindImageMemoryInfo-None-01901

If image was created with the [VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits) bit
set, the image **must** be bound to a memory object allocated with a memory
type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-VkBindImageMemoryInfo-None-01902) VUID-VkBindImageMemoryInfo-None-01902

If image was created with the [VK_IMAGE_CREATE_PROTECTED_BIT](#VkImageCreateFlagBits) bit
not set, the image **must** not be bound to a memory object created with a
memory type that reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-VkBindImageMemoryInfo-image-01050) VUID-VkBindImageMemoryInfo-image-01050

If `image` was created with
[VkDedicatedAllocationImageCreateInfoNV](#VkDedicatedAllocationImageCreateInfoNV)::`dedicatedAllocation`
equal to [VK_TRUE](fundamentals.html#VK_TRUE), `memory` **must** have been created with
[VkDedicatedAllocationMemoryAllocateInfoNV](memory.html#VkDedicatedAllocationMemoryAllocateInfoNV)::`image` equal to an
image handle created with identical creation parameters to `image`
and `memoryOffset` **must** be zero

* 
[](#VUID-VkBindImageMemoryInfo-apiVersion-07921) VUID-VkBindImageMemoryInfo-apiVersion-07921

    If
    the [VK_KHR_dedicated_allocation](../appendices/extensions.html#VK_KHR_dedicated_allocation) extension is not enabled,
    [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` is less than Vulkan
    1.1,
and
    `image` was not created with
    [VkDedicatedAllocationImageCreateInfoNV](#VkDedicatedAllocationImageCreateInfoNV)::`dedicatedAllocation`
    equal to [VK_TRUE](fundamentals.html#VK_TRUE), `memory` **must** not have been allocated
    dedicated for a specific buffer or image

* 
[](#VUID-VkBindImageMemoryInfo-memory-02728) VUID-VkBindImageMemoryInfo-memory-02728

If the value of [VkExportMemoryAllocateInfo](memory.html#VkExportMemoryAllocateInfo)::`handleTypes` used
to allocate `memory` is not `0`, it **must** include at least one of
the handles set in
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)::`handleTypes` when
`image` was created

* 
[](#VUID-VkBindImageMemoryInfo-memory-02989) VUID-VkBindImageMemoryInfo-memory-02989

If `memory` was created by a memory import operation,
that is not [VkImportAndroidHardwareBufferInfoANDROID](memory.html#VkImportAndroidHardwareBufferInfoANDROID) with a
non-`NULL` `buffer` value,
the external handle type of the imported memory **must** also have been set
in [VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)::`handleTypes` when
`image` was created

* 
[](#VUID-VkBindImageMemoryInfo-memory-02990) VUID-VkBindImageMemoryInfo-memory-02990

If `memory` was created with the
[VkImportAndroidHardwareBufferInfoANDROID](memory.html#VkImportAndroidHardwareBufferInfoANDROID) memory import operation
with a non-`NULL` `buffer` value,
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
**must** also have been set in
[VkExternalMemoryImageCreateInfo](#VkExternalMemoryImageCreateInfo)::`handleTypes` when
`image` was created

* 
[](#VUID-VkBindImageMemoryInfo-image-08113) VUID-VkBindImageMemoryInfo-image-08113

If the `image` was created with the
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-VkBindImageMemoryInfo-image-09202) VUID-VkBindImageMemoryInfo-image-09202

If the `image` was created with the
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](#VkImageCreateFlagBits) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01615) VUID-VkBindImageMemoryInfo-pNext-01615

If the `pNext` chain does not include a
[VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo) structure,
and `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
then `memory` **must** have been allocated using one of the memory
types allowed in the `memoryTypeBits` member of the
[VkMemoryRequirements](#VkMemoryRequirements) structure returned from a call to
[vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) with `image`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01616) VUID-VkBindImageMemoryInfo-pNext-01616

If the `pNext` chain does not include a
[VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo) structure,
and `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
then `memoryOffset` **must** be an integer multiple of the
`alignment` member of the [VkMemoryRequirements](#VkMemoryRequirements) structure
returned from a call to [vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) with
`image`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01617) VUID-VkBindImageMemoryInfo-pNext-01617

If the `pNext` chain does not include a
[VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo) structure,
and `memory` was not allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set,
then the difference of the size of `memory` and `memoryOffset`
**must** be greater than or equal to the `size` member of the
[VkMemoryRequirements](#VkMemoryRequirements) structure returned from a call to
[vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) with the same `image`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-12329) VUID-VkBindImageMemoryInfo-pNext-12329

If the `pNext` chain does not include a
[VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo) structure, and `memory` was
allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set, then
`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetImageMemoryRequirements2` with `image`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-12330) VUID-VkBindImageMemoryInfo-pNext-12330

If the `pNext` chain does not include a
[VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo) structure, and `memory` was
allocated from a memory heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](memory.html#VkMemoryHeapFlagBits) property set, then `size`
member of the `VkTileMemoryRequirementsQCOM` structure returned from
a call to `vkGetImageMemoryRequirements2` with `image` **must** be
less than or equal to the size of `memory` minus `memoryOffset`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01618) VUID-VkBindImageMemoryInfo-pNext-01618

If the `pNext` chain includes a [VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo)
structure, `image` **must** have been created with the
[VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits) bit set

* 
[](#VUID-VkBindImageMemoryInfo-image-07736) VUID-VkBindImageMemoryInfo-image-07736

If `image` was created with the [VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits)
bit set, then the `pNext` chain **must** include a
[VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo) structure

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01619) VUID-VkBindImageMemoryInfo-pNext-01619

If the `pNext` chain includes a [VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo)
structure, `memory` **must** have been allocated using one of the
memory types allowed in the `memoryTypeBits` member of the
[VkMemoryRequirements](#VkMemoryRequirements) structure returned from a call to
[vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) with `image` and where
[VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo)::`planeAspect` corresponds to the
[VkImagePlaneMemoryRequirementsInfo](#VkImagePlaneMemoryRequirementsInfo)::`planeAspect` in the
[VkImageMemoryRequirementsInfo2](#VkImageMemoryRequirementsInfo2) structure’s `pNext` chain

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01620) VUID-VkBindImageMemoryInfo-pNext-01620

If the `pNext` chain includes a [VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo)
structure, `memoryOffset` **must** be an integer multiple of the
`alignment` member of the [VkMemoryRequirements](#VkMemoryRequirements) structure
returned from a call to [vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) with
`image` and where
[VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo)::`planeAspect` corresponds to the
[VkImagePlaneMemoryRequirementsInfo](#VkImagePlaneMemoryRequirementsInfo)::`planeAspect` in the
[VkImageMemoryRequirementsInfo2](#VkImageMemoryRequirementsInfo2) structure’s `pNext` chain

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01621) VUID-VkBindImageMemoryInfo-pNext-01621

If the `pNext` chain includes a [VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo)
structure, the difference of the size of `memory` and
`memoryOffset` **must** be greater than or equal to the `size`
member of the [VkMemoryRequirements](#VkMemoryRequirements) structure returned from a call
to [vkGetImageMemoryRequirements2](#vkGetImageMemoryRequirements2) with the same `image` and
where [VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo)::`planeAspect` corresponds to
the [VkImagePlaneMemoryRequirementsInfo](#VkImagePlaneMemoryRequirementsInfo)::`planeAspect` in the
[VkImageMemoryRequirementsInfo2](#VkImageMemoryRequirementsInfo2) structure’s `pNext` chain

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01626) VUID-VkBindImageMemoryInfo-pNext-01626

If the `pNext` chain includes a
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo) structure, all instances of
`memory` specified by
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo)::`pDeviceIndices` **must** have
been allocated

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01627) VUID-VkBindImageMemoryInfo-pNext-01627

If the `pNext` chain includes a
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo) structure, and
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo)::`splitInstanceBindRegionCount`
is not zero, then `image` **must** have been created with the
[VK_IMAGE_CREATE_SPLIT_INSTANCE_BIND_REGIONS_BIT](#VkImageCreateFlagBits) bit set

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01628) VUID-VkBindImageMemoryInfo-pNext-01628

If the `pNext` chain includes a
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo) structure, all elements of
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo)::`pSplitInstanceBindRegions`
**must** be valid rectangles contained within the dimensions of `image`

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01629) VUID-VkBindImageMemoryInfo-pNext-01629

If the `pNext` chain includes a
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo) structure, the union of the areas
of all elements of
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo)::`pSplitInstanceBindRegions`
that correspond to the same instance of `image` **must** cover the
entire image

* 
[](#VUID-VkBindImageMemoryInfo-image-01630) VUID-VkBindImageMemoryInfo-image-01630

If `image` was created with a valid swapchain handle in
[VkImageSwapchainCreateInfoKHR](#VkImageSwapchainCreateInfoKHR)::`swapchain`, then the
`pNext` chain **must** include a
[VkBindImageMemorySwapchainInfoKHR](#VkBindImageMemorySwapchainInfoKHR) structure containing the same
swapchain handle

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01631) VUID-VkBindImageMemoryInfo-pNext-01631

If the `pNext` chain includes a
[VkBindImageMemorySwapchainInfoKHR](#VkBindImageMemorySwapchainInfoKHR) structure, `memory` **must** be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkBindImageMemoryInfo-pNext-01632) VUID-VkBindImageMemoryInfo-pNext-01632

If the `pNext` chain does not include a
[VkBindImageMemorySwapchainInfoKHR](#VkBindImageMemorySwapchainInfoKHR) structure, `memory` **must** be
a valid [VkDeviceMemory](memory.html#VkDeviceMemory) handle

Valid Usage (Implicit)

* 
[](#VUID-VkBindImageMemoryInfo-sType-sType) VUID-VkBindImageMemoryInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindImageMemoryInfo-pNext-pNext) VUID-VkBindImageMemoryInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo), [VkBindImageMemorySwapchainInfoKHR](#VkBindImageMemorySwapchainInfoKHR), [VkBindImagePlaneMemoryInfo](#VkBindImagePlaneMemoryInfo), or [VkBindMemoryStatus](#VkBindMemoryStatus)

* 
[](#VUID-VkBindImageMemoryInfo-sType-unique) VUID-VkBindImageMemoryInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBindImageMemoryInfo-image-parameter) VUID-VkBindImageMemoryInfo-image-parameter

 `image` **must** be a valid [VkImage](#VkImage) handle

* 
[](#VUID-VkBindImageMemoryInfo-commonparent) VUID-VkBindImageMemoryInfo-commonparent

 Both of `image`, and `memory` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `image` **must** be externally synchronized

The `VkBindImageMemoryDeviceGroupInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBindImageMemoryDeviceGroupInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           deviceIndexCount;
    const uint32_t*    pDeviceIndices;
    uint32_t           splitInstanceBindRegionCount;
    const VkRect2D*    pSplitInstanceBindRegions;
} VkBindImageMemoryDeviceGroupInfo;

// Provided by VK_KHR_bind_memory2 with VK_KHR_device_group
// Equivalent to VkBindImageMemoryDeviceGroupInfo
typedef VkBindImageMemoryDeviceGroupInfo VkBindImageMemoryDeviceGroupInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceIndexCount` is the number of elements in
`pDeviceIndices`.

* 
`pDeviceIndices` is a pointer to an array of device indices.

* 
`splitInstanceBindRegionCount` is the number of elements in
`pSplitInstanceBindRegions`.

* 
`pSplitInstanceBindRegions` is a pointer to an array of
[VkRect2D](fundamentals.html#VkRect2D) structures describing which regions of the image are
attached to each instance of memory.

If the `pNext` chain of [VkBindImageMemoryInfo](#VkBindImageMemoryInfo) includes a
`VkBindImageMemoryDeviceGroupInfo` structure, then that structure
determines how memory is bound to images across multiple devices in a device
group.

If `deviceIndexCount` is greater than zero, then on device index i
`image` is attached to the instance of the memory on the physical device
with device index `pDeviceIndices`[i].

Let N be the number of physical devices in the logical device.
If `splitInstanceBindRegionCount` is greater than zero, then
`pSplitInstanceBindRegions` is a pointer to an array of N2
rectangles, where the image region specified by the rectangle at element
i*N+j in resource instance i is bound to the memory instance
j.
The blocks of the memory that are bound to each sparse image block region
use an offset in memory, relative to `memoryOffset`, computed as if the
whole image was being bound to a contiguous range of memory.
In other words, horizontally adjacent image blocks use consecutive blocks of
memory, vertically adjacent image blocks are separated by the number of
bytes per block multiplied by the width in blocks of `image`, and the
block at (0,0) corresponds to memory starting at `memoryOffset`.

If `splitInstanceBindRegionCount` and `deviceIndexCount` are zero
and the memory comes from a memory heap with the
[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](memory.html#VkMemoryHeapFlagBits) bit set, then it is as if
`pDeviceIndices` contains consecutive indices from zero to the number of
physical devices in the logical device, minus one.
In other words, by default each physical device attaches to its own instance
of the memory.

If `splitInstanceBindRegionCount` and `deviceIndexCount` are zero
and the memory comes from a memory heap without the
[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](memory.html#VkMemoryHeapFlagBits) bit set, then it is as if
`pDeviceIndices` contains an array of zeros.
In other words, by default each physical device attaches to instance zero.

Valid Usage

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-deviceIndexCount-01633) VUID-VkBindImageMemoryDeviceGroupInfo-deviceIndexCount-01633

At least one of `deviceIndexCount` and
`splitInstanceBindRegionCount` **must** be zero

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-deviceIndexCount-01634) VUID-VkBindImageMemoryDeviceGroupInfo-deviceIndexCount-01634

`deviceIndexCount` **must** either be zero or equal to the number of
physical devices in the logical device

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-pDeviceIndices-01635) VUID-VkBindImageMemoryDeviceGroupInfo-pDeviceIndices-01635

All elements of `pDeviceIndices` **must** be valid device indices

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-splitInstanceBindRegionCount-01636) VUID-VkBindImageMemoryDeviceGroupInfo-splitInstanceBindRegionCount-01636

`splitInstanceBindRegionCount` **must** either be zero or equal to the
number of physical devices in the logical device squared

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-pSplitInstanceBindRegions-01637) VUID-VkBindImageMemoryDeviceGroupInfo-pSplitInstanceBindRegions-01637

Elements of `pSplitInstanceBindRegions` that correspond to the same
instance of an image **must** not overlap

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-offset-01638) VUID-VkBindImageMemoryDeviceGroupInfo-offset-01638

The `offset.x` member of any element of
`pSplitInstanceBindRegions` **must** be a multiple of the sparse image
block width
(`VkSparseImageFormatProperties`::`imageGranularity.width`) of
all non-metadata aspects of the image

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-offset-01639) VUID-VkBindImageMemoryDeviceGroupInfo-offset-01639

The `offset.y` member of any element of
`pSplitInstanceBindRegions` **must** be a multiple of the sparse image
block height
(`VkSparseImageFormatProperties`::`imageGranularity.height`) of
all non-metadata aspects of the image

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-extent-01640) VUID-VkBindImageMemoryDeviceGroupInfo-extent-01640

The `extent.width` member of any element of
`pSplitInstanceBindRegions` **must** either be a multiple of the sparse
image block width of all non-metadata aspects of the image, or else
`extent.width` +  `offset.x` **must** equal the width of the
image subresource

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-extent-01641) VUID-VkBindImageMemoryDeviceGroupInfo-extent-01641

The `extent.height` member of any element of
`pSplitInstanceBindRegions` **must** either be a multiple of the sparse
image block height of all non-metadata aspects of the image, or else
`extent.height` +  `offset.y` **must** equal the height of the
image subresource

Valid Usage (Implicit)

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-sType-sType) VUID-VkBindImageMemoryDeviceGroupInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_DEVICE_GROUP_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-pDeviceIndices-parameter) VUID-VkBindImageMemoryDeviceGroupInfo-pDeviceIndices-parameter

 If `deviceIndexCount` is not `0`, `pDeviceIndices` **must** be a valid pointer to an array of `deviceIndexCount` `uint32_t` values

* 
[](#VUID-VkBindImageMemoryDeviceGroupInfo-pSplitInstanceBindRegions-parameter) VUID-VkBindImageMemoryDeviceGroupInfo-pSplitInstanceBindRegions-parameter

 If `splitInstanceBindRegionCount` is not `0`, `pSplitInstanceBindRegions` **must** be a valid pointer to an array of `splitInstanceBindRegionCount` [VkRect2D](fundamentals.html#VkRect2D) structures

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindImageMemoryInfo](#VkBindImageMemoryInfo)

If the `pNext` chain of [VkBindImageMemoryInfo](#VkBindImageMemoryInfo) includes a
`VkBindImageMemorySwapchainInfoKHR` structure, then that structure
includes a swapchain handle and image index indicating that the image will
be bound to memory from that swapchain.

The `VkBindImageMemorySwapchainInfoKHR` structure is defined as:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
typedef struct VkBindImageMemorySwapchainInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkSwapchainKHR     swapchain;
    uint32_t           imageIndex;
} VkBindImageMemorySwapchainInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`swapchain` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a swapchain handle.

* 
`imageIndex` is an image index within `swapchain`.

If `swapchain` is not `NULL`, the `swapchain` and `imageIndex`
are used to determine the memory that the image is bound to, instead of
`memory` and `memoryOffset`.

Memory **can** be bound to a swapchain and use the `pDeviceIndices` or
`pSplitInstanceBindRegions` members of
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo).

Valid Usage

* 
[](#VUID-VkBindImageMemorySwapchainInfoKHR-imageIndex-01644) VUID-VkBindImageMemorySwapchainInfoKHR-imageIndex-01644

`imageIndex` **must** be less than the number of images in
`swapchain`

* 
[](#VUID-VkBindImageMemorySwapchainInfoKHR-swapchain-07756) VUID-VkBindImageMemorySwapchainInfoKHR-swapchain-07756

If the `swapchain` has been created with
[VK_SWAPCHAIN_CREATE_DEFERRED_MEMORY_ALLOCATION_BIT_KHR](VK_KHR_surface/wsi.html#VkSwapchainCreateFlagBitsKHR),
`imageIndex` **must** be one that has previously been returned by
[vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR) or [vkAcquireNextImage2KHR](VK_KHR_surface/wsi.html#vkAcquireNextImage2KHR)

Valid Usage (Implicit)

* 
[](#VUID-VkBindImageMemorySwapchainInfoKHR-sType-sType) VUID-VkBindImageMemorySwapchainInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_SWAPCHAIN_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindImageMemorySwapchainInfoKHR-swapchain-parameter) VUID-VkBindImageMemorySwapchainInfoKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VK_KHR_surface/wsi.html#VkSwapchainKHR) handle

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindImageMemoryInfo](#VkBindImageMemoryInfo)

In order to bind *planes* of a *disjoint image*, add a
`VkBindImagePlaneMemoryInfo` structure to the `pNext` chain of
[VkBindImageMemoryInfo](#VkBindImageMemoryInfo).

The `VkBindImagePlaneMemoryInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkBindImagePlaneMemoryInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkImageAspectFlagBits    planeAspect;
} VkBindImagePlaneMemoryInfo;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkBindImagePlaneMemoryInfo
typedef VkBindImagePlaneMemoryInfo VkBindImagePlaneMemoryInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`planeAspect` is a [VkImageAspectFlagBits](#VkImageAspectFlagBits) value specifying the
aspect of the disjoint image plane to bind.

Valid Usage

* 
[](#VUID-VkBindImagePlaneMemoryInfo-planeAspect-02283) VUID-VkBindImagePlaneMemoryInfo-planeAspect-02283

If the image’s `tiling` is [VK_IMAGE_TILING_LINEAR](#VkImageTiling) or
[VK_IMAGE_TILING_OPTIMAL](#VkImageTiling), then `planeAspect` **must** be a single
valid [multi-planar aspect mask](formats.html#formats-multiplanar-image-aspect) bit

* 
[](#VUID-VkBindImagePlaneMemoryInfo-planeAspect-02284) VUID-VkBindImagePlaneMemoryInfo-planeAspect-02284

If the image’s `tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then `planeAspect`
**must** be a single valid *memory plane* for the image (that is,
`aspectMask` **must** specify a plane index that is less than the
[VkDrmFormatModifierPropertiesEXT](formats.html#VkDrmFormatModifierPropertiesEXT)::`drmFormatModifierPlaneCount`
associated with the image’s `format` and
[VkImageDrmFormatModifierPropertiesEXT](#VkImageDrmFormatModifierPropertiesEXT)::`drmFormatModifier`)

Valid Usage (Implicit)

* 
[](#VUID-VkBindImagePlaneMemoryInfo-sType-sType) VUID-VkBindImagePlaneMemoryInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_IMAGE_PLANE_MEMORY_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindImagePlaneMemoryInfo-planeAspect-parameter) VUID-VkBindImagePlaneMemoryInfo-planeAspect-parameter

 `planeAspect` **must** be a valid [VkImageAspectFlagBits](#VkImageAspectFlagBits) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBindImageMemoryInfo](#VkBindImageMemoryInfo)

To attach memory to tensor objects call:

// Provided by VK_ARM_tensors
VkResult vkBindTensorMemoryARM(
    VkDevice                                    device,
    uint32_t                                    bindInfoCount,
    const VkBindTensorMemoryInfoARM*            pBindInfos);

* 
`device` is the logical device that owns the buffers and memory.

* 
`bindInfoCount` is the number of elements in `pBindInfos`.

* 
`pBindInfos` is a pointer to an array of structures of type
[VkBindTensorMemoryInfoARM](#VkBindTensorMemoryInfoARM), describing tensors and memory to bind.

On some implementations, it **may** be more efficient to batch memory bindings
into a single command.

Valid Usage (Implicit)

* 
[](#VUID-vkBindTensorMemoryARM-device-parameter) VUID-vkBindTensorMemoryARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkBindTensorMemoryARM-pBindInfos-parameter) VUID-vkBindTensorMemoryARM-pBindInfos-parameter

 `pBindInfos` **must** be a valid pointer to an array of `bindInfoCount` valid [VkBindTensorMemoryInfoARM](#VkBindTensorMemoryInfoARM) structures

* 
[](#VUID-vkBindTensorMemoryARM-bindInfoCount-arraylength) VUID-vkBindTensorMemoryARM-bindInfoCount-arraylength

 `bindInfoCount` **must** be greater than `0`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkBindTensorMemoryInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkBindTensorMemoryInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorARM        tensor;
    VkDeviceMemory     memory;
    VkDeviceSize       memoryOffset;
} VkBindTensorMemoryInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensor` is the tensor to be attached to memory.

* 
`memory` is a [VkDeviceMemory](memory.html#VkDeviceMemory) object describing the device
memory to attach.

* 
`memoryOffset` is the start offset of the region of `memory`
which is to be bound to the tensor.
The number of bytes returned in the
`VkMemoryRequirements`::`size` member in `memory`, starting
from `memoryOffset` bytes, will be bound to the specified tensor.

Valid Usage

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09712) VUID-VkBindTensorMemoryInfoARM-tensor-09712

`tensor` **must** not already be backed by a memory object

* 
[](#VUID-VkBindTensorMemoryInfoARM-memoryOffset-09713) VUID-VkBindTensorMemoryInfoARM-memoryOffset-09713

`memoryOffset` **must** be less than the size of `memory`

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-09714) VUID-VkBindTensorMemoryInfoARM-memory-09714

`memory` **must** have been allocated using one of the memory types
allowed in the `memoryTypeBits` member of the
`VkMemoryRequirements` structure returned from a call to
`vkGetTensorMemoryRequirementsARM` with `tensor`

* 
[](#VUID-VkBindTensorMemoryInfoARM-memoryOffset-09715) VUID-VkBindTensorMemoryInfoARM-memoryOffset-09715

`memoryOffset` **must** be an integer multiple of the `alignment`
member of the `VkMemoryRequirements` structure returned from a call
to `vkGetTensorMemoryRequirementsARM` with `tensor`

* 
[](#VUID-VkBindTensorMemoryInfoARM-size-09716) VUID-VkBindTensorMemoryInfoARM-size-09716

The `size` member of the `VkMemoryRequirements` structure
returned from a call to `vkGetTensorMemoryRequirementsARM` with
`tensor` **must** be less than or equal to the size of `memory`
minus `memoryOffset`

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09717) VUID-VkBindTensorMemoryInfoARM-tensor-09717

If `tensor` requires a dedicated allocation (as reported by
[vkGetTensorMemoryRequirementsARM](#vkGetTensorMemoryRequirementsARM) in
[VkMemoryDedicatedRequirements](#VkMemoryDedicatedRequirements)::`requiresDedicatedAllocation`
for `tensor`), `memory` **must** have been created with
[VkMemoryDedicatedAllocateInfoTensorARM](memory.html#VkMemoryDedicatedAllocateInfoTensorARM)::`tensor` equal to
`tensor`

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-09806) VUID-VkBindTensorMemoryInfoARM-memory-09806

If the [VkMemoryAllocateInfo](memory.html#VkMemoryAllocateInfo) provided when `memory` was
allocated included a [VkMemoryDedicatedAllocateInfoTensorARM](memory.html#VkMemoryDedicatedAllocateInfoTensorARM)
structure in its `pNext` chain, and
[VkMemoryDedicatedAllocateInfoTensorARM](memory.html#VkMemoryDedicatedAllocateInfoTensorARM)::`tensor` was not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then `tensor` **must** equal
[VkMemoryDedicatedAllocateInfoTensorARM](memory.html#VkMemoryDedicatedAllocateInfoTensorARM)::`tensor`, and
`memoryOffset` **must** be zero

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-09895) VUID-VkBindTensorMemoryInfoARM-memory-09895

If the value of [VkExportMemoryAllocateInfo](memory.html#VkExportMemoryAllocateInfo)::`handleTypes` used
to allocate `memory` is not `0`, it **must** include at least one of
the handles set in
[VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM)::`handleTypes` when
`tensor` was created

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-09896) VUID-VkBindTensorMemoryInfoARM-memory-09896

If `memory` was allocated by a memory import operation,
that is not [VkImportAndroidHardwareBufferInfoANDROID](memory.html#VkImportAndroidHardwareBufferInfoANDROID) with a
non-`NULL` `buffer` value,
the external handle type of the imported memory **must** also have been set
in [VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM)::`handleTypes` when
`tensor` was created

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-09897) VUID-VkBindTensorMemoryInfoARM-memory-09897

If `memory` was allocated with the
[VkImportAndroidHardwareBufferInfoANDROID](memory.html#VkImportAndroidHardwareBufferInfoANDROID) memory import operation
with a non-`NULL` `buffer` value,
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
**must** also have been set in
[VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM)::`handleTypes` when
`tensor` was created

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09718) VUID-VkBindTensorMemoryInfoARM-tensor-09718

If `tensor` was created with the
[VK_TENSOR_CREATE_PROTECTED_BIT_ARM](#VkTensorCreateFlagBitsARM) bit set, the tensor **must** be
bound to a memory object allocated with a memory type that reports
[VK_MEMORY_PROPERTY_PROTECTED_BIT](memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09719) VUID-VkBindTensorMemoryInfoARM-tensor-09719

If `tensor` was created with the
[VK_TENSOR_CREATE_PROTECTED_BIT_ARM](#VkTensorCreateFlagBitsARM) bit not set, the tensor **must**
not be bound to a memory object allocated with a memory type that
reports [VK_MEMORY_PROPERTY_PROTECTED_BIT](memory.html#VkMemoryPropertyFlagBits)

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09943) VUID-VkBindTensorMemoryInfoARM-tensor-09943

If `tensor` was created with the
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-09944) VUID-VkBindTensorMemoryInfoARM-tensor-09944

If `tensor` was created with the
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-11406) VUID-VkBindTensorMemoryInfoARM-tensor-11406

If `tensor` was created with the
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-11407) VUID-VkBindTensorMemoryInfoARM-tensor-11407

If `tensor` was created with the
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM) bit set,
`memory` **must** have been allocated with the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](memory.html#VkMemoryAllocateFlagBitsKHR) bit set

Valid Usage (Implicit)

* 
[](#VUID-VkBindTensorMemoryInfoARM-sType-sType) VUID-VkBindTensorMemoryInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_TENSOR_MEMORY_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindTensorMemoryInfoARM-pNext-pNext) VUID-VkBindTensorMemoryInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBindTensorMemoryInfoARM-tensor-parameter) VUID-VkBindTensorMemoryInfoARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](#VkTensorARM) handle

* 
[](#VUID-VkBindTensorMemoryInfoARM-memory-parameter) VUID-VkBindTensorMemoryInfoARM-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](memory.html#VkDeviceMemory) handle

* 
[](#VUID-VkBindTensorMemoryInfoARM-commonparent) VUID-VkBindTensorMemoryInfoARM-commonparent

 Both of `memory`, and `tensor` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `tensor` **must** be externally synchronized

Buffer-Image Granularity
The implementation-dependent limit [`bufferImageGranularity`](limits.html#limits-bufferImageGranularity) specifies a page-like granularity at which
linear and non-linear resources **must** be placed in adjacent memory locations
to avoid aliasing.
Two resources which do not satisfy this granularity requirement are said to
[alias](#resources-memory-aliasing).
`bufferImageGranularity` is specified in bytes, and **must** be a power of
two.
Implementations which do not impose a granularity restriction **may** report a
`bufferImageGranularity` value of one.

|  | Despite its name, `bufferImageGranularity` is really a granularity
| --- | --- |
between “linear” and “non-linear” resources.
The limit `bufferImageGranularity` also applies to tensor resources. |

Given resourceA at the lower memory offset and resourceB at the higher
memory offset in the same `VkDeviceMemory` object, where one resource is
linear and the other is non-linear (as defined in the
[Glossary](../appendices/glossary.html#glossary-linear-resource)), and the following:

resourceA.end       = resourceA.memoryOffset + resourceA.size - 1
resourceA.endPage   = resourceA.end & ~(bufferImageGranularity-1)
resourceB.start     = resourceB.memoryOffset
resourceB.startPage = resourceB.start & ~(bufferImageGranularity-1)

The following property **must** hold:

resourceA.endPage 

That is, the end of the first resource (A) and the beginning of the second
resource (B) **must** be on separate “pages” of size
`bufferImageGranularity`.
`bufferImageGranularity` **may** be different than the physical page size
of the memory heap.
This restriction is only needed when a linear resource and a non-linear
resource are adjacent in memory and will be used simultaneously.
The memory ranges of adjacent resources **can** be closer than
`bufferImageGranularity`, provided they meet the `alignment`
requirement for the objects in question.

Sparse block size in bytes and sparse image and buffer memory alignments
**must** all be multiples of the `bufferImageGranularity`.
Therefore, memory bound to sparse resources naturally satisfies the
`bufferImageGranularity`.

|  | The implementation-dependent limit, `bufferImageGranularity` also
| --- | --- |
applies to tensor resources. |

Buffer and image objects are created with a *sharing mode* controlling how
they **can** be accessed from queues.
The supported sharing modes are:

// Provided by VK_VERSION_1_0
typedef enum VkSharingMode {
    VK_SHARING_MODE_EXCLUSIVE = 0,
    VK_SHARING_MODE_CONCURRENT = 1,
} VkSharingMode;

* 
[VK_SHARING_MODE_EXCLUSIVE](#VkSharingMode) specifies that access to any range or
image subresource of the object will be exclusive to a single queue
family at a time.

* 
[VK_SHARING_MODE_CONCURRENT](#VkSharingMode) specifies that concurrent access to any
range or image subresource of the object from multiple queue families is
supported.

|  | [VK_SHARING_MODE_CONCURRENT](#VkSharingMode) **may** result in lower performance access to
| --- | --- |
the buffer or image than [VK_SHARING_MODE_EXCLUSIVE](#VkSharingMode). |

Ranges of buffers and image subresources of image objects created using
[VK_SHARING_MODE_EXCLUSIVE](#VkSharingMode) **must** only be accessed by queues in the
queue family that has *ownership* of the resource.
Upon creation, such resources are not owned by any queue family; ownership
is implicitly acquired upon first use within a queue.
Once a resource using [VK_SHARING_MODE_EXCLUSIVE](#VkSharingMode) is owned by some queue
family,
unless the [`maintenance9`](features.html#features-maintenance9) feature is enabled,
the application **must** perform a [queue family ownership transfer](synchronization.html#synchronization-queue-transfers) if it wishes to make the memory contents of a
range or image subresource accessible to a different queue family.
[VK_SHARING_MODE_EXCLUSIVE](#VkSharingMode) resources that are already owned by a queue
family **may** be acquired by a different queue family without a queue family
ownership transfer, but
unless the [`maintenance9`](features.html#features-maintenance9) feature is enabled,
their contents become **undefined**.

If the [`maintenance9`](features.html#features-maintenance9) feature is enabled, the
contents of buffer resources, and of linear image resources (i.e., those
created with `tiling` set to [VK_IMAGE_TILING_LINEAR](#VkImageTiling)) are always
preserved when they are implicitly acquired by a different queue family on
the same logical device (i.e., neither queue family is
[VK_QUEUE_FAMILY_FOREIGN_EXT](synchronization.html#VK_QUEUE_FAMILY_FOREIGN_EXT) or
[VK_QUEUE_FAMILY_EXTERNAL](synchronization.html#VK_QUEUE_FAMILY_EXTERNAL)).
This means that whenever the [`maintenance9`](features.html#features-maintenance9)
feature is enabled, explicit queue family ownership transfers of buffer and
linear image resources between different queue families on the same logical
device are **optional**.

Additionally, if the [`maintenance9`](features.html#features-maintenance9) feature
is enabled, the contents of some optimal image resources (i.e., those
created with [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling)) are always preserved when they
are implicitly acquired by a different queue family on the same logical
device (i.e., neither queue family is
[VK_QUEUE_FAMILY_FOREIGN_EXT](synchronization.html#VK_QUEUE_FAMILY_FOREIGN_EXT) or
[VK_QUEUE_FAMILY_EXTERNAL](synchronization.html#VK_QUEUE_FAMILY_EXTERNAL)).
This applies only to optimal images that are being implicitly acquired by a
queue family whose index bit is set in the current queue family’s
[VkQueueFamilyOwnershipTransferPropertiesKHR](devsandqueues.html#VkQueueFamilyOwnershipTransferPropertiesKHR)::`optimalImageTransferToQueueFamilies`,
and that were created without any of the following bits set in `usage`:

* 
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_ATTACHMENT_FEEDBACK_LOOP_BIT_EXT](#VkImageUsageFlagBits)

* 
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkImageUsageFlagBits)

This means that whenever the [`maintenance9`](features.html#features-maintenance9)
feature is enabled, explicit queue family ownership transfers of such image
resources between such combinations of queue families are **optional**.
For all other optimal images and/or combinations of queue families, the
application **must** still perform an explicit queue family ownership transfer
if it wishes to make the memory contents of an optimal image subresource
already owned by a queue family accessible to a different queue family.

|  | Applications are allowed to perform explicit queue family ownership
| --- | --- |
transfers in circumstances where they are not required, but there is no
functional nor performance advantage in doing so.
Performing explicit transfers in such cases remains supported for backward
compatibility and is not recommended for new applications. |

|  | Before being used on the first queue, images still require a
| --- | --- |
[layout transition](#resources-image-layouts) from these layouts:

* 
[VK_IMAGE_LAYOUT_UNDEFINED](#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_PREINITIALIZED](#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#VkImageLayout) |

A queue family **can** take ownership of an
image subresource, tensor subresource,
or buffer range of a resource created with [VK_SHARING_MODE_EXCLUSIVE](#VkSharingMode),
without an ownership transfer, in the same way as for a resource that was
just created; however, taking ownership in this way has the effect that the
contents of the image subresource or buffer range are **undefined**.

Ranges of
buffers, tensor subresources of tensor objects,
and image subresources of image objects created using
[VK_SHARING_MODE_CONCURRENT](#VkSharingMode) **must** only be accessed by queues from the
queue families specified through the `queueFamilyIndexCount` and
`pQueueFamilyIndices` members of the corresponding create info
structures.

Resources **should** only be accessed in the Vulkan instance that has exclusive
ownership of their underlying memory.
Only one Vulkan instance has exclusive ownership of a resource’s underlying
memory at a given time, regardless of whether the resource was created using
[VK_SHARING_MODE_EXCLUSIVE](#VkSharingMode) or [VK_SHARING_MODE_CONCURRENT](#VkSharingMode).
Applications can transfer ownership of a resource’s underlying memory only
if the memory has been imported from or exported to another instance or
external API using external memory handles.
The semantics for transferring ownership outside of the instance are similar
to those used for transferring ownership of [VK_SHARING_MODE_EXCLUSIVE](#VkSharingMode)
resources between queues, and is also accomplished using
[VkBufferMemoryBarrier](synchronization.html#VkBufferMemoryBarrier) or [VkImageMemoryBarrier](synchronization.html#VkImageMemoryBarrier) operations.
To make the contents of the underlying memory accessible in the destination
instance or API, applications **must**

Release exclusive ownership from the source instance or API.

Ensure the release operation has completed using semaphores or fences.

Acquire exclusive ownership in the destination instance or API

Unlike queue family ownership transfers, the destination instance or API is
not specified explicitly when releasing ownership, nor is the source
instance or API specified when acquiring ownership.
Instead, the image or memory barrier’s `dstQueueFamilyIndex` or
`srcQueueFamilyIndex` parameters are set to the reserved queue family
index [VK_QUEUE_FAMILY_EXTERNAL](synchronization.html#VK_QUEUE_FAMILY_EXTERNAL)
or [VK_QUEUE_FAMILY_FOREIGN_EXT](synchronization.html#VK_QUEUE_FAMILY_FOREIGN_EXT)
to represent the external destination or source respectively.

Binding a resource to a memory object shared between multiple Vulkan
instances or other APIs does not change the ownership of the underlying
memory.
The first entity to access the resource implicitly acquires ownership.
An entity **can** also implicitly take ownership from another entity in the
same way without an explicit ownership transfer.
However, taking ownership in this way has the effect that the contents of
the underlying memory are **undefined**.

Accessing a resource backed by memory that is owned by a particular instance
or API has the same semantics as accessing a [VK_SHARING_MODE_EXCLUSIVE](#VkSharingMode)
resource, with one exception: Implementations **must** ensure layout
transitions performed on one member of a set of identical subresources of
identical images that alias the same range of an underlying memory object
affect the layout of all the subresources in the set.

As a corollary, writes to any image subresources in such a set **must** not
make the contents of memory used by other subresources in the set
**undefined**.
An application **can** define the content of a subresource of one image by
performing device writes to an identical subresource of another image
provided both images are bound to the same region of external memory.
Applications **may** also add resources to such a set after the content of the
existing set members has been defined without making the content **undefined**
by creating a new image with the initial layout
[VK_IMAGE_LAYOUT_UNDEFINED](#VkImageLayout) and binding it to the same region of
external memory as the existing images.

|  | Because layout transitions apply to all identical images aliasing the same
| --- | --- |
region of external memory, the actual layout of the memory backing a new
image as well as an existing image with defined content will not be
**undefined**.
Such an image is not usable until it acquires ownership of its memory from
the existing owner.
Therefore, the layout specified as part of this transition will be the true
initial layout of the image.
The **undefined** layout specified when creating it is a placeholder to
simplify valid usage requirements. |

When sharing resources with other APIs, it is generally left to those APIs
to define how they interact with the Vulkan concepts of image layouts and
fine-grained synchronization.
However, some external memory handle types require use of specific image
layouts when transitioning to or from external usage, as defined in the
[external image implied layouts table](#resources-external-image-layouts).

A range of a `VkDeviceMemory` allocation is *aliased* if it is bound to
multiple resources simultaneously, as described below, via
[vkBindImageMemory](#vkBindImageMemory), [vkBindBufferMemory](#vkBindBufferMemory),
[vkBindAccelerationStructureMemoryNV](#vkBindAccelerationStructureMemoryNV),
[vkBindTensorMemoryARM](#vkBindTensorMemoryARM),
via [sparse memory bindings](sparsemem.html#sparsememory-resource-binding),
or by binding the memory to resources in multiple Vulkan instances or
external APIs using external memory handle export and import mechanisms.

Consider two resources, resourceA and resourceB, bound respectively to
memory rangeA and rangeB.
Let paddedRangeA and paddedRangeB be, respectively, rangeA and
rangeB aligned to `bufferImageGranularity`.
If the resources are both linear or both non-linear (as defined in the
[Glossary](../appendices/glossary.html#glossary-linear-resource)), then the resources *alias* the
memory in the intersection of rangeA and rangeB.
If one resource is linear and the other is non-linear, then the resources
*alias* the memory in the intersection of paddedRangeA and paddedRangeB.

Applications **can** alias memory, but use of multiple aliases is subject to
several constraints.

|  | The implementation-dependent limit `bufferImageGranularity` also applies
| --- | --- |
to tensor resources. |

|  | Memory aliasing **can** be useful to reduce the total device memory footprint
| --- | --- |
of an application, if some large resources are used for disjoint periods of
time. |

When a [non-linear](../appendices/glossary.html#glossary-linear-resource),
non-[VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits) image is bound to an aliased
range, all image subresources of the image *overlap* the range.
When a linear image is bound to an aliased range, the image subresources
that (according to the image’s advertised layout) include bytes from the
aliased range overlap the range.
When a [VK_IMAGE_CREATE_SPARSE_RESIDENCY_BIT](#VkImageCreateFlagBits) image has sparse image
blocks bound to an aliased range, only image subresources including those
sparse image blocks overlap the range, and when the memory bound to the
image’s mip tail overlaps an aliased range all image subresources in the mip
tail overlap the range.

Buffers,
linear tensors,
and linear image subresources are considered *host-accessible subresources*
when they are in any of these layouts:

* 
[VK_IMAGE_LAYOUT_PREINITIALIZED](#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_GENERAL](#VkImageLayout)

* 
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#VkImageLayout)

That is, the host has a well-defined addressing scheme to interpret the
contents, and thus the layout of the data in memory **can** be consistently
interpreted across aliases if each of those aliases is a host-accessible
subresource.
Non-linear images,
non-linear tensors,
and linear image subresources in other layouts, are not host-accessible.

If two aliases are both host-accessible, then they interpret the contents of
the memory in consistent ways, and data written to one alias **can** be read by
the other alias.

For an acceleration structure `AS_2` that is an alias of another
acceleration structure `AS_1`, `AS_2` **can** be used in place of `AS_1` for
operations acting on acceleration structures if the following conditions are
met:

* 
The buffer referred to by the `buffer` member of the
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR) that `AS_2` was created with
**must** be bound to the same [VkDeviceMemory](memory.html#VkDeviceMemory) as the buffer referred
to by the `buffer` member of the
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR) that `AS_1` was created with.

* 
The start of the memory range occupied by `AS_2`, defined by the sum of
the `offset` member of the
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR) that `AS_2` was created with
and the offset at which the buffer associated with `AS_2` is bound to a
[VkDeviceMemory](memory.html#VkDeviceMemory), **must** match the start of the memory range occupied
by `AS_1`.

* 
If the `deviceAddress` member of the
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR) that `AS_2` was created with
is non-zero, it **must** match the `deviceAddress` member of the
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR) that `AS_1` was created with.

* 
The `createFlags` member of the
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR) that `AS_2` was created with
**must** match the `createFlags` member of the
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR) that `AS_1` was created with.

* 
The `type` member of the [VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR)
that `AS_2` was created with **must** match the `type` member of the
[VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR) that `AS_1` was created with.

* 
The `size` member of the [VkAccelerationStructureCreateInfoKHR](#VkAccelerationStructureCreateInfoKHR)
that `AS_2` was created with **must** be greater or equal to the `size`
returned by [vkGetAccelerationStructureBuildSizesKHR](#vkGetAccelerationStructureBuildSizesKHR) for the build
parameters `AS_1` was built with.

After an acceleration structure object is destroyed, aliased acceleration
structures **may** continue being used to refer to that acceleration structure
for operations acting on acceleration structures.

If two aliases are both images that were created with identical creation
parameters, both were created with the [VK_IMAGE_CREATE_ALIAS_BIT](#VkImageCreateFlagBits) flag
set, and both are bound identically to memory
except for [VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo)::`pDeviceIndices` and
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo)::`pSplitInstanceBindRegions`,
then they interpret the contents of the memory in consistent ways, and data
written to one alias **can** be read by the other alias.

Additionally, if an individual plane of a multi-planar image and a
single-plane image alias the same memory, then they also interpret the
contents of the memory in consistent ways under the same conditions, but
with the following modifications:

* 
Both **must** have been created with the [VK_IMAGE_CREATE_DISJOINT_BIT](#VkImageCreateFlagBits)
flag.

* 
The single-plane image **must** have a [VkFormat](formats.html#VkFormat) that is
[equivalent](formats.html#formats-compatible-planes) to that of the multi-planar
image’s individual plane.

* 
The single-plane image and the individual plane of the multi-planar
image **must** be bound identically to memory
except for [VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo)::`pDeviceIndices`
and
[VkBindImageMemoryDeviceGroupInfo](#VkBindImageMemoryDeviceGroupInfo)::`pSplitInstanceBindRegions`.

* 
The `width` and `height` of the single-plane image are derived
from the multi-planar image’s dimensions in the manner listed for
[plane compatibility](formats.html#formats-compatible-planes) for the aliased plane.

* 
If either image’s `tiling` is
[VK_IMAGE_TILING_DRM_FORMAT_MODIFIER_EXT](#VkImageTiling), then both images **must** be
[linear](../appendices/glossary.html#glossary-linear-resource).

* 
All other creation parameters **must** be identical

Aliases created by binding the same memory to resources in multiple Vulkan
instances or external APIs using external memory handle export and import
mechanisms interpret the contents of the memory in consistent ways, and data
written to one alias **can** be read by the other alias.

Aliases created by binding the same memory to a tensor and an image
subresource interpret the contents of the memory in consistent ways if and
only if:

* 
The image was created with [VK_IMAGE_TILING_LINEAR](#VkImageTiling) and the tensor
was created with [VK_TENSOR_TILING_LINEAR_ARM](#VkTensorTilingARM).
The strides for the image subresource, as reported by
[vkGetImageSubresourceLayout](#vkGetImageSubresourceLayout), are compatible with strides passed
when creating the tensor, i.e.
[VkTensorDescriptionARM](#VkTensorDescriptionARM)::`pStrides`[`dimensionCount`-3]
must be equal to [VkSubresourceLayout](#VkSubresourceLayout)::`rowPitch` if
[VkTensorDescriptionARM](#VkTensorDescriptionARM)::`dimensionCount` is greater than 2 and
[VkTensorDescriptionARM](#VkTensorDescriptionARM)::`pStrides`[`dimensionCount`-4]
must be equal to [VkSubresourceLayout](#VkSubresourceLayout)::`depthPitch` if
[VkTensorDescriptionARM](#VkTensorDescriptionARM)::`dimensionCount` is greater than 3.

* 
The image was created with [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling) and the tensor
was created with [VK_TENSOR_TILING_OPTIMAL_ARM](#VkTensorTilingARM).
The image was created with the
[VK_IMAGE_USAGE_TENSOR_ALIASING_BIT_ARM](#VkImageUsageFlagBits) usage flag set and the
tensor was created with [VK_TENSOR_USAGE_IMAGE_ALIASING_BIT_ARM](#VkTensorUsageFlagBitsARM).

* 
The format of the tensor must be compatible with that of the individual
components of the format of the image.

* 
The number of dimensions of the tensor
([VkTensorDescriptionARM](#VkTensorDescriptionARM)::`dimensionCount`) is greater than or
equal to the number of dimensions of the image (as specified by
[VkImageCreateInfo](#VkImageCreateInfo)::`imageType`) plus 1.

* 
The size of the tensor along its innermost dimension
([VkTensorDescriptionARM](#VkTensorDescriptionARM)::`pDimensions`[`dimensionCount`-1])
is equal to the number of components of the format of the image
([VkImageCreateInfo](#VkImageCreateInfo)::`format`).

* 
The size of the tensor along all dimensions other than the N innermost
dimensions necessary to represent the image (i.e. the number of
dimensions of the image plus 1) must be 1.

* 
The image subresource is in the
[VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](#VkImageLayout) layout if the image was
created with [VK_IMAGE_TILING_OPTIMAL](#VkImageTiling)
and the [`unifiedImageLayouts`](features.html#features-unifiedImageLayouts)
feature is not enabled.
If the [`unifiedImageLayouts`](features.html#features-unifiedImageLayouts)
feature if not enabled, the image **must** be transitioned to
[VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](#VkImageLayout) prior to any reads via the
tensor resource for those reads to return data consistent with that
provided to the image writes.
If the [`unifiedImageLayouts`](features.html#features-unifiedImageLayouts)
feature if not enabled, the image **must** be transitioned to
[VK_IMAGE_LAYOUT_TENSOR_ALIASING_ARM](#VkImageLayout) prior to any writes performed
via the tensor resource for reads performed via the image resource to
return data consistent with that provided to the tensor writes.

Otherwise, the aliases interpret the contents of the memory differently, and
writes via one alias make the contents of memory partially or completely
**undefined** to the other alias.
If the first alias is a host-accessible subresource, then the bytes affected
are those written by the memory operations according to its addressing
scheme.
If the first alias is not host-accessible, then the bytes affected are those
overlapped by the image subresources that were written.
If the second alias is a host-accessible subresource, the affected bytes
become **undefined**.
If the second alias is not host-accessible, all sparse image blocks (for
sparse partially-resident images) or all image subresources (for non-sparse
image and fully resident sparse images) that overlap the affected bytes
become **undefined**.

If any image subresources are made **undefined** due to writes to an alias,
then each of those image subresources **must** have its layout transitioned
from [VK_IMAGE_LAYOUT_UNDEFINED](#VkImageLayout) to a valid layout before it is used,
from [VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](#VkImageLayout) if it is zeroed,
or from [VK_IMAGE_LAYOUT_PREINITIALIZED](#VkImageLayout) if the memory has been written
by the host.
If any sparse blocks of a sparse image have been made **undefined**, then only
the image subresources containing them **must** be transitioned.

Use of an overlapping range by two aliases **must** be separated by a memory
dependency using the appropriate [access types](synchronization.html#synchronization-access-types) if at least one of those uses performs writes, whether the aliases
interpret memory consistently or not.
If buffer or image memory barriers are used, the scope of the barrier **must**
contain the entire range and/or set of image subresources that overlap.

If two aliasing image views are used in the same framebuffer, then the
render pass **must** declare the attachments using the
[](renderpass.html#renderpass-aliasing)[VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](renderpass.html#VkAttachmentDescriptionFlagBits), and
follow the other rules listed in that section.

|  | Memory recycled via an application suballocator (i.e. without freeing and
| --- | --- |
reallocating the memory objects) is not substantially different from memory
aliasing.
However, a suballocator usually waits on a fence before recycling a region
of memory, and signaling a fence involves sufficient implicit dependencies
to satisfy all the above requirements. |

Applications **can** safely access resources concurrently via separate device
and host operations as long as the accessed memory locations are guaranteed
to not overlap, as defined in [Memory Location](../appendices/memorymodel.html#memory-model-memory-location), and the operation, resource, and access are otherwise
independently valid.

Some operations have alignment requirements or access ambiguous
[memory locations](../appendices/memorymodel.html#memory-model-memory-location), so the semantics of a
particular operation **should** be considered when determining the overlap.
Such requirements will be described alongside the operation.
Operations between host and device when using non-coherent memory are
aligned to [`nonCoherentAtomSize`](limits.html#limits-nonCoherentAtomSize), as
defined by [vkFlushMappedMemoryRanges](memory.html#vkFlushMappedMemoryRanges) and
[vkInvalidateMappedMemoryRanges](memory.html#vkInvalidateMappedMemoryRanges).

|  | The intent is that buffers (or linear images) can be accessed concurrently,
| --- | --- |
even when they share cache lines, but otherwise do not access the same
memory range.
The concept of a device cache line size is not exposed in the memory model. |

Fuchsia’s FIDL-based Sysmem service interoperates with Vulkan via the
`[VK_FUCHSIA_buffer_collection](../appendices/extensions.html#VK_FUCHSIA_buffer_collection)` extension.

A buffer collection is a set of one or more buffers which were allocated
together as a group and which all have the same properties.
These properties describe the buffers' internal representation, such as its
dimensions and memory layout.
This ensures that all of the buffers can be used interchangeably by tasks
that require swapping among multiple buffers, such as double-buffered
graphics rendering.

On Fuchsia, the Sysmem service uses buffer collections as a core construct
in its design.

Buffer collections are represented by `VkBufferCollectionFUCHSIA`
handles:

// Provided by VK_FUCHSIA_buffer_collection
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkBufferCollectionFUCHSIA)

* 
FIDL - Fuchsia Interface Definition Language.
The declarative language used to define FIDL interprocess communication
interfaces on Fuchsia.
FIDL files use the `fidl` extension.
FIDL is also used to refer to the services defined by interfaces
declared in the FIDL language

* 
Sysmem - The FIDL service that facilitates optimal buffer sharing and
reuse on Fuchsia

* 
client - Any participant of the buffer collection e.g. the Vulkan
application

* 
token - A `zx_handle_t` Zircon channel object that allows
participation in the buffer collection

To initialize a buffer collection on Fuchsia:

* 
Connect to the Sysmem service to initialize a Sysmem allocator

* 
Create an initial buffer collection token using the Sysmem allocator

* 
Duplicate the token for each participant beyond the initiator

* 
See the Sysmem Overview and fuchsia.sysmem FIDL documentation on
fuchsia.dev for more detailed information

To create a [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) for Vulkan to participate in the
buffer collection:

// Provided by VK_FUCHSIA_buffer_collection
VkResult vkCreateBufferCollectionFUCHSIA(
    VkDevice                                    device,
    const VkBufferCollectionCreateInfoFUCHSIA*  pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkBufferCollectionFUCHSIA*                  pCollection);

* 
`device` is the logical device that creates the
`VkBufferCollectionFUCHSIA`

* 
`pCreateInfo` is a pointer to a
[VkBufferCollectionCreateInfoFUCHSIA](#VkBufferCollectionCreateInfoFUCHSIA) structure containing
parameters affecting creation of the buffer collection

* 
`pAllocator` is a pointer to a [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure
controlling host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter

* 
`pCollection` is a pointer to a [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA)
handle in which the resulting buffer collection object is returned

Valid Usage (Implicit)

* 
[](#VUID-vkCreateBufferCollectionFUCHSIA-device-parameter) VUID-vkCreateBufferCollectionFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateBufferCollectionFUCHSIA-pCreateInfo-parameter) VUID-vkCreateBufferCollectionFUCHSIA-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkBufferCollectionCreateInfoFUCHSIA](#VkBufferCollectionCreateInfoFUCHSIA) structure

* 
[](#VUID-vkCreateBufferCollectionFUCHSIA-pAllocator-parameter) VUID-vkCreateBufferCollectionFUCHSIA-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateBufferCollectionFUCHSIA-pCollection-parameter) VUID-vkCreateBufferCollectionFUCHSIA-pCollection-parameter

 `pCollection` **must** be a valid pointer to a [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
[](#VUID-vkCreateBufferCollectionFUCHSIA-device-queuecount) VUID-vkCreateBufferCollectionFUCHSIA-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Host Access

All functions referencing a [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) **must** be
externally synchronized with the exception of
`vkCreateBufferCollectionFUCHSIA`.

The `VkBufferCollectionCreateInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferCollectionCreateInfoFUCHSIA {
    VkStructureType    sType;
    const void*        pNext;
    zx_handle_t        collectionToken;
} VkBufferCollectionCreateInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`collectionToken` is a `zx_handle_t` containing the Sysmem
client’s buffer collection token

Valid Usage

* 
[](#VUID-VkBufferCollectionCreateInfoFUCHSIA-collectionToken-06393) VUID-VkBufferCollectionCreateInfoFUCHSIA-collectionToken-06393

`collectionToken` **must** be a valid `zx_handle_t` to a Zircon
channel allocated from Sysmem
(`fuchsia.sysmem.Allocator`/AllocateSharedCollection) with
`ZX_DEFAULT_CHANNEL_RIGHTS` rights

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCollectionCreateInfoFUCHSIA-sType-sType) VUID-VkBufferCollectionCreateInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COLLECTION_CREATE_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferCollectionCreateInfoFUCHSIA-pNext-pNext) VUID-VkBufferCollectionCreateInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

Buffer collections can be established for [VkImage](#VkImage) allocations or
[VkBuffer](#VkBuffer) allocations.

Setting the constraints on the buffer collection initiates the format
negotiation and allocation of the buffer collection.
To set the constraints on a [VkImage](#VkImage) buffer collection, call:

// Provided by VK_FUCHSIA_buffer_collection
VkResult vkSetBufferCollectionImageConstraintsFUCHSIA(
    VkDevice                                    device,
    VkBufferCollectionFUCHSIA                   collection,
    const VkImageConstraintsInfoFUCHSIA*        pImageConstraintsInfo);

* 
`device` is the logical device

* 
`collection` is the [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
`pImageConstraintsInfo` is a pointer to a
[VkImageConstraintsInfoFUCHSIA](#VkImageConstraintsInfoFUCHSIA) structure

`vkSetBufferCollectionImageConstraintsFUCHSIA` **may** fail if
`pImageConstraintsInfo->formatConstraintsCount` is larger than the
implementation-defined limit.
If that occurs, [vkSetBufferCollectionImageConstraintsFUCHSIA](#vkSetBufferCollectionImageConstraintsFUCHSIA) will
return [VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult).

`vkSetBufferCollectionImageConstraintsFUCHSIA` **may** fail if the
implementation does not support any of the formats described by the
`pImageConstraintsInfo` structure.
If that occurs, [vkSetBufferCollectionImageConstraintsFUCHSIA](#vkSetBufferCollectionImageConstraintsFUCHSIA) will
return [VK_ERROR_FORMAT_NOT_SUPPORTED](fundamentals.html#VkResult).

Valid Usage

* 
[](#VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-06394) VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-06394

`vkSetBufferCollectionImageConstraintsFUCHSIA` or
`vkSetBufferCollectionBufferConstraintsFUCHSIA` **must** not have
already been called on `collection`

Valid Usage (Implicit)

* 
[](#VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-device-parameter) VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-parameter) VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
[](#VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-pImageConstraintsInfo-parameter) VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-pImageConstraintsInfo-parameter

 `pImageConstraintsInfo` **must** be a valid pointer to a valid [VkImageConstraintsInfoFUCHSIA](#VkImageConstraintsInfoFUCHSIA) structure

* 
[](#VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-parent) VUID-vkSetBufferCollectionImageConstraintsFUCHSIA-collection-parent

 `collection` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](fundamentals.html#VkResult)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkImageConstraintsInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkImageConstraintsInfoFUCHSIA {
    VkStructureType                               sType;
    const void*                                   pNext;
    uint32_t                                      formatConstraintsCount;
    const VkImageFormatConstraintsInfoFUCHSIA*    pFormatConstraints;
    VkBufferCollectionConstraintsInfoFUCHSIA      bufferCollectionConstraints;
    VkImageConstraintsInfoFlagsFUCHSIA            flags;
} VkImageConstraintsInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`formatConstraintsCount` is the number of elements in
`pFormatConstraints`.

* 
`pFormatConstraints` is a pointer to an array of
[VkImageFormatConstraintsInfoFUCHSIA](#VkImageFormatConstraintsInfoFUCHSIA) structures of size
`formatConstraintsCount` that is used to further constrain buffer
collection format selection for image-based buffer collections.

* 
`bufferCollectionConstraints` is a
[VkBufferCollectionConstraintsInfoFUCHSIA](#VkBufferCollectionConstraintsInfoFUCHSIA) structure used to supply
parameters for the negotiation and allocation for buffer-based buffer
collections.

* 
`flags` is a [VkImageConstraintsInfoFlagBitsFUCHSIA](#VkImageConstraintsInfoFlagBitsFUCHSIA) value
specifying hints about the type of memory Sysmem should allocate for the
buffer collection.

Valid Usage

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06395) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06395

All elements of `pFormatConstraints` **must** have at least one bit set
in its
[VkImageFormatConstraintsInfoFUCHSIA](#VkImageFormatConstraintsInfoFUCHSIA)::`requiredFormatFeatures`

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06396) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06396

If `pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_SAMPLED_BIT](#VkImageUsageFlagBits), then
`pFormatConstraints->requiredFormatFeatures` **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06397) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06397

If `pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_STORAGE_BIT](#VkImageUsageFlagBits), then
`pFormatConstraints->requiredFormatFeatures` **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06398) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06398

If `pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](#VkImageUsageFlagBits), then
`pFormatConstraints->requiredFormatFeatures` **must** contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06399) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06399

If `pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](#VkImageUsageFlagBits), then
`pFormatConstraints->requiredFormatFeatures` **must** contain
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06400) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06400

If `pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](#VkImageUsageFlagBits), then
`pFormatConstraints->requiredFormatFeatures` **must** contain at least
one of [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits) or
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-attachmentFragmentShadingRate-06401) VUID-VkImageConstraintsInfoFUCHSIA-attachmentFragmentShadingRate-06401

If the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) feature is enabled, and
`pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](#VkImageUsageFlagBits), then
`pFormatConstraints->requiredFormatFeatures` **must** contain
[VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](formats.html#VkFormatFeatureFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-sType-sType) VUID-VkImageConstraintsInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_CONSTRAINTS_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pNext-pNext) VUID-VkImageConstraintsInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-parameter) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-parameter

 `pFormatConstraints` **must** be a valid pointer to an array of `formatConstraintsCount` valid [VkImageFormatConstraintsInfoFUCHSIA](#VkImageFormatConstraintsInfoFUCHSIA) structures

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-bufferCollectionConstraints-parameter) VUID-VkImageConstraintsInfoFUCHSIA-bufferCollectionConstraints-parameter

 `bufferCollectionConstraints` **must** be a valid [VkBufferCollectionConstraintsInfoFUCHSIA](#VkBufferCollectionConstraintsInfoFUCHSIA) structure

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-flags-parameter) VUID-VkImageConstraintsInfoFUCHSIA-flags-parameter

 `flags` **must** be a valid combination of [VkImageConstraintsInfoFlagBitsFUCHSIA](#VkImageConstraintsInfoFlagBitsFUCHSIA) values

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-formatConstraintsCount-arraylength) VUID-VkImageConstraintsInfoFUCHSIA-formatConstraintsCount-arraylength

 `formatConstraintsCount` **must** be greater than `0`

// Provided by VK_FUCHSIA_buffer_collection
typedef VkFlags VkImageConstraintsInfoFlagsFUCHSIA;

`VkImageConstraintsInfoFlagsFUCHSIA` is a bitmask type for setting a
mask of zero or more [VkImageConstraintsInfoFlagBitsFUCHSIA](#VkImageConstraintsInfoFlagBitsFUCHSIA) bits.

Bits which **can** be set in
[VkImageConstraintsInfoFlagBitsFUCHSIA](#VkImageConstraintsInfoFlagBitsFUCHSIA)::`flags` include:

// Provided by VK_FUCHSIA_buffer_collection
typedef enum VkImageConstraintsInfoFlagBitsFUCHSIA {
    VK_IMAGE_CONSTRAINTS_INFO_CPU_READ_RARELY_FUCHSIA = 0x00000001,
    VK_IMAGE_CONSTRAINTS_INFO_CPU_READ_OFTEN_FUCHSIA = 0x00000002,
    VK_IMAGE_CONSTRAINTS_INFO_CPU_WRITE_RARELY_FUCHSIA = 0x00000004,
    VK_IMAGE_CONSTRAINTS_INFO_CPU_WRITE_OFTEN_FUCHSIA = 0x00000008,
    VK_IMAGE_CONSTRAINTS_INFO_PROTECTED_OPTIONAL_FUCHSIA = 0x00000010,
} VkImageConstraintsInfoFlagBitsFUCHSIA;

General hints about the type of memory that should be allocated by Sysmem
based on the expected usage of the images in the buffer collection include:

* 
[VK_IMAGE_CONSTRAINTS_INFO_CPU_READ_RARELY_FUCHSIA](#VkImageConstraintsInfoFlagBitsFUCHSIA)

* 
[VK_IMAGE_CONSTRAINTS_INFO_CPU_READ_OFTEN_FUCHSIA](#VkImageConstraintsInfoFlagBitsFUCHSIA)

* 
[VK_IMAGE_CONSTRAINTS_INFO_CPU_WRITE_RARELY_FUCHSIA](#VkImageConstraintsInfoFlagBitsFUCHSIA)

* 
[VK_IMAGE_CONSTRAINTS_INFO_CPU_WRITE_OFTEN_FUCHSIA](#VkImageConstraintsInfoFlagBitsFUCHSIA)

For protected memory:

* 
[VK_IMAGE_CONSTRAINTS_INFO_PROTECTED_OPTIONAL_FUCHSIA](#VkImageConstraintsInfoFlagBitsFUCHSIA) specifies
that protected memory is optional for the buffer collection.

Note that if all participants in the buffer collection (Vulkan or otherwise)
specify that protected memory is optional, Sysmem will not allocate
protected memory.

The `VkImageFormatConstraintsInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkImageFormatConstraintsInfoFUCHSIA {
    VkStructureType                         sType;
    const void*                             pNext;
    VkImageCreateInfo                       imageCreateInfo;
    VkFormatFeatureFlags                    requiredFormatFeatures;
    VkImageFormatConstraintsFlagsFUCHSIA    flags;
    uint64_t                                sysmemPixelFormat;
    uint32_t                                colorSpaceCount;
    const VkSysmemColorSpaceFUCHSIA*        pColorSpaces;
} VkImageFormatConstraintsInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`imageCreateInfo` is the [VkImageCreateInfo](#VkImageCreateInfo) used to create a
[VkImage](#VkImage) that is to use memory from the
[VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA)

* 
`requiredFormatFeatures` is a bitmask of
[VkFormatFeatureFlagBits](formats.html#VkFormatFeatureFlagBits) specifying required features of the
buffers in the buffer collection

* 
`flags` is reserved for future use

* 
`sysmemPixelFormat` is a `PixelFormatType` value from the
`fuchsia.sysmem/image_formats.fidl` FIDL interface

* 
`colorSpaceCount` is the element count of `pColorSpaces`

* 
`pColorSpaces` is a pointer to an array of
[VkSysmemColorSpaceFUCHSIA](#VkSysmemColorSpaceFUCHSIA) structs of size `colorSpaceCount`

Valid Usage (Implicit)

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-sType-sType) VUID-VkImageFormatConstraintsInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_FORMAT_CONSTRAINTS_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-pNext-pNext) VUID-VkImageFormatConstraintsInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-imageCreateInfo-parameter) VUID-VkImageFormatConstraintsInfoFUCHSIA-imageCreateInfo-parameter

 `imageCreateInfo` **must** be a valid [VkImageCreateInfo](#VkImageCreateInfo) structure

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-requiredFormatFeatures-parameter) VUID-VkImageFormatConstraintsInfoFUCHSIA-requiredFormatFeatures-parameter

 `requiredFormatFeatures` **must** be a valid combination of [VkFormatFeatureFlagBits](formats.html#VkFormatFeatureFlagBits) values

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-requiredFormatFeatures-requiredbitmask) VUID-VkImageFormatConstraintsInfoFUCHSIA-requiredFormatFeatures-requiredbitmask

 `requiredFormatFeatures` **must** not be `0`

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-flags-zerobitmask) VUID-VkImageFormatConstraintsInfoFUCHSIA-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-pColorSpaces-parameter) VUID-VkImageFormatConstraintsInfoFUCHSIA-pColorSpaces-parameter

 `pColorSpaces` **must** be a valid pointer to an array of `colorSpaceCount` valid [VkSysmemColorSpaceFUCHSIA](#VkSysmemColorSpaceFUCHSIA) structures

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-colorSpaceCount-arraylength) VUID-VkImageFormatConstraintsInfoFUCHSIA-colorSpaceCount-arraylength

 `colorSpaceCount` **must** be greater than `0`

// Provided by VK_FUCHSIA_buffer_collection
typedef VkFlags VkImageFormatConstraintsFlagsFUCHSIA;

`VkImageFormatConstraintsFlagsFUCHSIA` is a bitmask type for setting a
mask, but is currently reserved for future use.

The `VkBufferCollectionConstraintsInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferCollectionConstraintsInfoFUCHSIA {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           minBufferCount;
    uint32_t           maxBufferCount;
    uint32_t           minBufferCountForCamping;
    uint32_t           minBufferCountForDedicatedSlack;
    uint32_t           minBufferCountForSharedSlack;
} VkBufferCollectionConstraintsInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`minBufferCount` is the minimum number of buffers available in the
collection

* 
`maxBufferCount` is the maximum number of buffers allowed in the
collection

* 
`minBufferCountForCamping` is the per-participant minimum buffers
for camping

* 
`minBufferCountForDedicatedSlack` is the per-participant minimum
buffers for dedicated slack

* 
`minBufferCountForSharedSlack` is the per-participant minimum
buffers for shared slack

Sysmem uses all buffer count parameters in combination to determine the
number of buffers it will allocate.
Sysmem defines buffer count constraints in
`fuchsia.sysmem/constraints.fidl`.

*Camping* as referred to by `minBufferCountForCamping`, is the number of
buffers that should be available for the participant that are not for
transient use.
This number of buffers is required for the participant to logically operate.

*Slack* as referred to by `minBufferCountForDedicatedSlack` and
`minBufferCountForSharedSlack`, refers to the number of buffers desired
by participants for optimal performance.
`minBufferCountForDedicatedSlack` refers to the current participant.
`minBufferCountForSharedSlack` refers to buffer slack for all
participants in the collection.

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCollectionConstraintsInfoFUCHSIA-sType-sType) VUID-VkBufferCollectionConstraintsInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COLLECTION_CONSTRAINTS_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferCollectionConstraintsInfoFUCHSIA-pNext-pNext) VUID-VkBufferCollectionConstraintsInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

The `VkSysmemColorSpaceFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkSysmemColorSpaceFUCHSIA {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           colorSpace;
} VkSysmemColorSpaceFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`colorSpace` value of the Sysmem `ColorSpaceType`

Valid Usage

* 
[](#VUID-VkSysmemColorSpaceFUCHSIA-colorSpace-06402) VUID-VkSysmemColorSpaceFUCHSIA-colorSpace-06402

`colorSpace` **must** be a `ColorSpaceType` as defined in
`fuchsia.sysmem/image_formats.fidl`

Valid Usage (Implicit)

* 
[](#VUID-VkSysmemColorSpaceFUCHSIA-sType-sType) VUID-VkSysmemColorSpaceFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SYSMEM_COLOR_SPACE_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSysmemColorSpaceFUCHSIA-pNext-pNext) VUID-VkSysmemColorSpaceFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

To set the constraints on a [VkBuffer](#VkBuffer) buffer collection, call:

// Provided by VK_FUCHSIA_buffer_collection
VkResult vkSetBufferCollectionBufferConstraintsFUCHSIA(
    VkDevice                                    device,
    VkBufferCollectionFUCHSIA                   collection,
    const VkBufferConstraintsInfoFUCHSIA*       pBufferConstraintsInfo);

* 
`device` is the logical device

* 
`collection` is the [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
`pBufferConstraintsInfo` is a pointer to a
[VkBufferConstraintsInfoFUCHSIA](#VkBufferConstraintsInfoFUCHSIA) structure

`vkSetBufferCollectionBufferConstraintsFUCHSIA` **may** fail if the
implementation does not support the constraints specified in the
`bufferCollectionConstraints` structure.
If that occurs, [vkSetBufferCollectionBufferConstraintsFUCHSIA](#vkSetBufferCollectionBufferConstraintsFUCHSIA) will
return [VK_ERROR_FORMAT_NOT_SUPPORTED](fundamentals.html#VkResult).

Valid Usage

* 
[](#VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-06403) VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-06403

`vkSetBufferCollectionImageConstraintsFUCHSIA` or
`vkSetBufferCollectionBufferConstraintsFUCHSIA` **must** not have
already been called on `collection`

Valid Usage (Implicit)

* 
[](#VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-device-parameter) VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-parameter) VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
[](#VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-pBufferConstraintsInfo-parameter) VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-pBufferConstraintsInfo-parameter

 `pBufferConstraintsInfo` **must** be a valid pointer to a valid [VkBufferConstraintsInfoFUCHSIA](#VkBufferConstraintsInfoFUCHSIA) structure

* 
[](#VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-parent) VUID-vkSetBufferCollectionBufferConstraintsFUCHSIA-collection-parent

 `collection` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](fundamentals.html#VkResult)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkBufferConstraintsInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferConstraintsInfoFUCHSIA {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkBufferCreateInfo                          createInfo;
    VkFormatFeatureFlags                        requiredFormatFeatures;
    VkBufferCollectionConstraintsInfoFUCHSIA    bufferCollectionConstraints;
} VkBufferConstraintsInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`createInfo` is a pointer to a [VkBufferCreateInfo](#VkBufferCreateInfo) struct
describing the buffer attributes for the buffer collection

* 
`requiredFormatFeatures` is a bitmask of
[VkFormatFeatureFlagBits](formats.html#VkFormatFeatureFlagBits) required features of the buffers in the
buffer collection

* 
`bufferCollectionConstraints` is used to supply parameters for the
negotiation and allocation of the buffer collection

Valid Usage

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-requiredFormatFeatures-06404) VUID-VkBufferConstraintsInfoFUCHSIA-requiredFormatFeatures-06404

The `requiredFormatFeatures` bitmask of
[VkFormatFeatureFlagBits](formats.html#VkFormatFeatureFlagBits) **must** be chosen from among the buffer
compatible format features listed in
[buffer compatible format features](formats.html#buffer-compatible-format-features)

Valid Usage (Implicit)

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-sType-sType) VUID-VkBufferConstraintsInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_CONSTRAINTS_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-pNext-pNext) VUID-VkBufferConstraintsInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-createInfo-parameter) VUID-VkBufferConstraintsInfoFUCHSIA-createInfo-parameter

 `createInfo` **must** be a valid [VkBufferCreateInfo](#VkBufferCreateInfo) structure

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-requiredFormatFeatures-parameter) VUID-VkBufferConstraintsInfoFUCHSIA-requiredFormatFeatures-parameter

 `requiredFormatFeatures` **must** be a valid combination of [VkFormatFeatureFlagBits](formats.html#VkFormatFeatureFlagBits) values

* 
[](#VUID-VkBufferConstraintsInfoFUCHSIA-bufferCollectionConstraints-parameter) VUID-VkBufferConstraintsInfoFUCHSIA-bufferCollectionConstraints-parameter

 `bufferCollectionConstraints` **must** be a valid [VkBufferCollectionConstraintsInfoFUCHSIA](#VkBufferCollectionConstraintsInfoFUCHSIA) structure

After constraints have been set on the buffer collection by calling
[vkSetBufferCollectionImageConstraintsFUCHSIA](#vkSetBufferCollectionImageConstraintsFUCHSIA) or
[vkSetBufferCollectionBufferConstraintsFUCHSIA](#vkSetBufferCollectionBufferConstraintsFUCHSIA), call
`vkGetBufferCollectionPropertiesFUCHSIA` to retrieve the negotiated and
finalized properties of the buffer collection.

The call to `vkGetBufferCollectionPropertiesFUCHSIA` is synchronous.
It waits for the Sysmem format negotiation and buffer collection allocation
to complete before returning.

// Provided by VK_FUCHSIA_buffer_collection
VkResult vkGetBufferCollectionPropertiesFUCHSIA(
    VkDevice                                    device,
    VkBufferCollectionFUCHSIA                   collection,
    VkBufferCollectionPropertiesFUCHSIA*        pProperties);

* 
`device` is the logical device handle

* 
`collection` is the [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
`pProperties` is a pointer to the retrieved
[VkBufferCollectionPropertiesFUCHSIA](#VkBufferCollectionPropertiesFUCHSIA) struct

For image-based buffer collections, upon calling
`vkGetBufferCollectionPropertiesFUCHSIA`, Sysmem will choose an element
of the [VkImageConstraintsInfoFUCHSIA](#VkImageConstraintsInfoFUCHSIA)::`pImageCreateInfos`
established by the preceding call to
[vkSetBufferCollectionImageConstraintsFUCHSIA](#vkSetBufferCollectionImageConstraintsFUCHSIA).
The index of the element chosen is stored in and can be retrieved from
[VkBufferCollectionPropertiesFUCHSIA](#VkBufferCollectionPropertiesFUCHSIA)::`createInfoIndex`.

For buffer-based buffer collections, a single [VkBufferCreateInfo](#VkBufferCreateInfo) is
specified as [VkBufferConstraintsInfoFUCHSIA](#VkBufferConstraintsInfoFUCHSIA)::`createInfo`.
[VkBufferCollectionPropertiesFUCHSIA](#VkBufferCollectionPropertiesFUCHSIA)::`createInfoIndex` will
therefore always be zero.

`vkGetBufferCollectionPropertiesFUCHSIA` **may** fail if Sysmem is unable
to resolve the constraints of all of the participants in the buffer
collection.
If that occurs, `vkGetBufferCollectionPropertiesFUCHSIA` will return
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult).

Valid Usage

* 
[](#VUID-vkGetBufferCollectionPropertiesFUCHSIA-None-06405) VUID-vkGetBufferCollectionPropertiesFUCHSIA-None-06405

Prior to calling [vkGetBufferCollectionPropertiesFUCHSIA](#vkGetBufferCollectionPropertiesFUCHSIA), the
constraints on the buffer collection **must** have been set by either
[vkSetBufferCollectionImageConstraintsFUCHSIA](#vkSetBufferCollectionImageConstraintsFUCHSIA) or
[vkSetBufferCollectionBufferConstraintsFUCHSIA](#vkSetBufferCollectionBufferConstraintsFUCHSIA)

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferCollectionPropertiesFUCHSIA-device-parameter) VUID-vkGetBufferCollectionPropertiesFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetBufferCollectionPropertiesFUCHSIA-collection-parameter) VUID-vkGetBufferCollectionPropertiesFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
[](#VUID-vkGetBufferCollectionPropertiesFUCHSIA-pProperties-parameter) VUID-vkGetBufferCollectionPropertiesFUCHSIA-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkBufferCollectionPropertiesFUCHSIA](#VkBufferCollectionPropertiesFUCHSIA) structure

* 
[](#VUID-vkGetBufferCollectionPropertiesFUCHSIA-collection-parent) VUID-vkGetBufferCollectionPropertiesFUCHSIA-collection-parent

 `collection` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkBufferCollectionPropertiesFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkBufferCollectionPropertiesFUCHSIA {
    VkStructureType                  sType;
    void*                            pNext;
    uint32_t                         memoryTypeBits;
    uint32_t                         bufferCount;
    uint32_t                         createInfoIndex;
    uint64_t                         sysmemPixelFormat;
    VkFormatFeatureFlags             formatFeatures;
    VkSysmemColorSpaceFUCHSIA        sysmemColorSpaceIndex;
    VkComponentMapping               samplerYcbcrConversionComponents;
    VkSamplerYcbcrModelConversion    suggestedYcbcrModel;
    VkSamplerYcbcrRange              suggestedYcbcrRange;
    VkChromaLocation                 suggestedXChromaOffset;
    VkChromaLocation                 suggestedYChromaOffset;
} VkBufferCollectionPropertiesFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the buffer collection can be imported as buffer
collection

* 
`bufferCount` is the number of buffers in the collection

* 
`createInfoIndex` as described in [    Sysmem chosen create infos](#sysmem-chosen-create-infos)

* 
`sysmemPixelFormat` is the Sysmem `PixelFormatType` as defined in
`fuchsia.sysmem/image_formats.fidl`

* 
`formatFeatures` is a bitmask of [VkFormatFeatureFlagBits](formats.html#VkFormatFeatureFlagBits)
shared by the buffer collection

* 
`sysmemColorSpaceIndex` is a [VkSysmemColorSpaceFUCHSIA](#VkSysmemColorSpaceFUCHSIA) struct
specifying the color space

* 
`samplerYcbcrConversionComponents` is a [VkComponentMapping](#VkComponentMapping)
structure specifying the component mapping

* 
`suggestedYcbcrModel` is a [VkSamplerYcbcrModelConversion](samplers.html#VkSamplerYcbcrModelConversion) value
specifying the suggested Y′CBCR model

* 
`suggestedYcbcrRange` is a [VkSamplerYcbcrRange](samplers.html#VkSamplerYcbcrRange) value
specifying the suggested Y′CBCR range

* 
`suggestedXChromaOffset` is a [VkChromaLocation](samplers.html#VkChromaLocation) value
specifying the suggested X chroma offset

* 
`suggestedYChromaOffset` is a [VkChromaLocation](samplers.html#VkChromaLocation) value
specifying the suggested Y chroma offset

`sysmemColorSpace` is only set for image-based buffer collections where
the constraints were specified using [VkImageConstraintsInfoFUCHSIA](#VkImageConstraintsInfoFUCHSIA) in
a call to [vkSetBufferCollectionImageConstraintsFUCHSIA](#vkSetBufferCollectionImageConstraintsFUCHSIA).

For image-based buffer collections, `createInfoIndex` will identify both
the [VkImageConstraintsInfoFUCHSIA](#VkImageConstraintsInfoFUCHSIA)::`pImageCreateInfos` element and
the [VkImageConstraintsInfoFUCHSIA](#VkImageConstraintsInfoFUCHSIA)::`pFormatConstraints` element
chosen by Sysmem when [vkSetBufferCollectionImageConstraintsFUCHSIA](#vkSetBufferCollectionImageConstraintsFUCHSIA) was
called.
The value of `sysmemColorSpaceIndex` will be an index to one of the
color spaces provided in the
[VkImageFormatConstraintsInfoFUCHSIA](#VkImageFormatConstraintsInfoFUCHSIA)::`pColorSpaces` array.

The implementation **must** have `formatFeatures` with all bits set that
were set in
[VkImageFormatConstraintsInfoFUCHSIA](#VkImageFormatConstraintsInfoFUCHSIA)::`requiredFormatFeatures`, by
the call to [vkSetBufferCollectionImageConstraintsFUCHSIA](#vkSetBufferCollectionImageConstraintsFUCHSIA), at
`createInfoIndex` (other bits could be set as well).

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCollectionPropertiesFUCHSIA-sType-sType) VUID-VkBufferCollectionPropertiesFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_COLLECTION_PROPERTIES_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferCollectionPropertiesFUCHSIA-pNext-pNext) VUID-VkBufferCollectionPropertiesFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

To import memory from a buffer collection into a [VkImage](#VkImage) or a
[VkBuffer](#VkBuffer), chain a [VkImportMemoryBufferCollectionFUCHSIA](#VkImportMemoryBufferCollectionFUCHSIA)
structure to the `pNext` member of the [VkMemoryAllocateInfo](memory.html#VkMemoryAllocateInfo) in the
call to [vkAllocateMemory](memory.html#vkAllocateMemory).

The `VkImportMemoryBufferCollectionFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkImportMemoryBufferCollectionFUCHSIA {
    VkStructureType              sType;
    const void*                  pNext;
    VkBufferCollectionFUCHSIA    collection;
    uint32_t                     index;
} VkImportMemoryBufferCollectionFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`collection` is the [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
`index` is the index of the buffer to import from `collection`

Valid Usage

* 
[](#VUID-VkImportMemoryBufferCollectionFUCHSIA-index-06406) VUID-VkImportMemoryBufferCollectionFUCHSIA-index-06406

`index` **must** be less than the value retrieved as
[VkBufferCollectionPropertiesFUCHSIA](#VkBufferCollectionPropertiesFUCHSIA)::`bufferCount`

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryBufferCollectionFUCHSIA-sType-sType) VUID-VkImportMemoryBufferCollectionFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_BUFFER_COLLECTION_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportMemoryBufferCollectionFUCHSIA-collection-parameter) VUID-VkImportMemoryBufferCollectionFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](memory.html#VkMemoryAllocateInfo)

To release a [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA):

// Provided by VK_FUCHSIA_buffer_collection
void vkDestroyBufferCollectionFUCHSIA(
    VkDevice                                    device,
    VkBufferCollectionFUCHSIA                   collection,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that creates the
`VkBufferCollectionFUCHSIA`

* 
`collection` is the [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
`pAllocator` is a pointer to a [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure
controlling host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter

Valid Usage

* 
[](#VUID-vkDestroyBufferCollectionFUCHSIA-collection-06407) VUID-vkDestroyBufferCollectionFUCHSIA-collection-06407

[VkImage](#VkImage) and [VkBuffer](#VkBuffer) objects that referenced
`collection` upon creation by inclusion of a
[VkBufferCollectionImageCreateInfoFUCHSIA](#VkBufferCollectionImageCreateInfoFUCHSIA) or
[VkBufferCollectionBufferCreateInfoFUCHSIA](#VkBufferCollectionBufferCreateInfoFUCHSIA) chained to their
[VkImageCreateInfo](#VkImageCreateInfo) or [VkBufferCreateInfo](#VkBufferCreateInfo) structures
respectively, **may** outlive `collection`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyBufferCollectionFUCHSIA-device-parameter) VUID-vkDestroyBufferCollectionFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyBufferCollectionFUCHSIA-collection-parameter) VUID-vkDestroyBufferCollectionFUCHSIA-collection-parameter

 `collection` **must** be a valid [VkBufferCollectionFUCHSIA](#VkBufferCollectionFUCHSIA) handle

* 
[](#VUID-vkDestroyBufferCollectionFUCHSIA-pAllocator-parameter) VUID-vkDestroyBufferCollectionFUCHSIA-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyBufferCollectionFUCHSIA-collection-parent) VUID-vkDestroyBufferCollectionFUCHSIA-collection-parent

 `collection` **must** have been created, allocated, or retrieved from `device`

Tensors are similar to [images](images.html#images), in that they have
multi-dimensional access as documented in the [Tensor Operations](VK_ARM_tensors/tensorops.html#tensors) chapter, but a
tensor’s dimensions are not predefined.
A tensor can have an arbitrary number of dimensions, up to
[`maxTensorDimensionCount`](limits.html#limits-maxTensorDimensionCount), with one
index per dimension used to access the tensor.

Tensors **can** be used by binding them to pipelines via descriptor sets, or by
directly specifying them as parameters to certain commands.

Tensors are represented by `VkTensorARM` handles:

// Provided by VK_EXT_descriptor_heap, VK_ARM_tensors
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkTensorARM)

To create tensors, call:

// Provided by VK_ARM_tensors
VkResult vkCreateTensorARM(
    VkDevice                                    device,
    const VkTensorCreateInfoARM*                pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkTensorARM*                                pTensor);

* 
`device` is the logical device that creates the tensor.

* 
`pCreateInfo` is a pointer to a [VkTensorCreateInfoARM](#VkTensorCreateInfoARM)
structure containing parameters to be used to create the tensor.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pTensor` is a pointer to a [VkTensorARM](#VkTensorARM) handle in which the
resulting tensor object is returned.

Valid Usage

* 
[](#VUID-vkCreateTensorARM-tensors-09832) VUID-vkCreateTensorARM-tensors-09832

The [`tensors`](features.html#features-tensors) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreateTensorARM-device-parameter) VUID-vkCreateTensorARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateTensorARM-pCreateInfo-parameter) VUID-vkCreateTensorARM-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkTensorCreateInfoARM](#VkTensorCreateInfoARM) structure

* 
[](#VUID-vkCreateTensorARM-pAllocator-parameter) VUID-vkCreateTensorARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateTensorARM-pTensor-parameter) VUID-vkCreateTensorARM-pTensor-parameter

 `pTensor` **must** be a valid pointer to a [VkTensorARM](#VkTensorARM) handle

* 
[](#VUID-vkCreateTensorARM-device-queuecount) VUID-vkCreateTensorARM-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The [VkTensorCreateInfoARM](#VkTensorCreateInfoARM) structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorCreateInfoARM {
    VkStructureType                  sType;
    const void*                      pNext;
    VkTensorCreateFlagsARM           flags;
    const VkTensorDescriptionARM*    pDescription;
    VkSharingMode                    sharingMode;
    uint32_t                         queueFamilyIndexCount;
    const uint32_t*                  pQueueFamilyIndices;
} VkTensorCreateInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkTensorCreateFlagBitsARM](#VkTensorCreateFlagBitsARM) describing
additional parameters of the tensor.

* 
`pDescription` is a pointer to an instance of
[VkTensorDescriptionARM](#VkTensorDescriptionARM) describing the tensor.

* 
`sharingMode` is a [VkSharingMode](#VkSharingMode) value specifying the sharing
mode of the tensor when it will be accessed by multiple queue families.

* 
`queueFamilyIndexCount` is the number of entries in the
`pQueueFamilyIndices` array.

* 
`pQueueFamilyIndices` is a list of queue families that will access
this tensor (ignored if `sharingMode` is not
[VK_SHARING_MODE_CONCURRENT](#VkSharingMode)).

To determine the set of valid `usage` bits for a given tensor format,
call [vkGetPhysicalDeviceFormatProperties2](formats.html#vkGetPhysicalDeviceFormatProperties2) with
[VkTensorFormatPropertiesARM](formats.html#VkTensorFormatPropertiesARM) in the `pNext` chain.

Tensor Creation Limits

Valid values for some tensor creation parameters are limited by a numerical
upper bound or by inclusion in a bitset.

Several limiting values are defined below.
The limiting values are referenced by the relevant valid usage statements of
`VkTensorCreateInfoARM`.

* 
Let the uint64_t tensorElements define the number of data elements
in the tensor computed as the product of all
`VkTensorCreateInfoARM`::`pDescription->pDimensions`[i] for i
between 0 and
`VkTensorCreateInfoARM`::`pDescription->dimensionCount` - 1.

Valid Usage

* 
[](#VUID-VkTensorCreateInfoARM-pDescription-09720) VUID-VkTensorCreateInfoARM-pDescription-09720

If `pDescription->tiling` is [VK_TENSOR_TILING_OPTIMAL_ARM](#VkTensorTilingARM),
`pDescription->pStrides` **must** be `NULL`

* 
[](#VUID-VkTensorCreateInfoARM-tensorElements-09721) VUID-VkTensorCreateInfoARM-tensorElements-09721

`tensorElements` (as defined in
[resources-tensor-creation-limits](#resources-tensor-creation-limits)) **must** not be greater than
[VkPhysicalDeviceTensorPropertiesARM](limits.html#VkPhysicalDeviceTensorPropertiesARM)::`maxTensorElements`

* 
[](#VUID-VkTensorCreateInfoARM-sharingMode-09722) VUID-VkTensorCreateInfoARM-sharingMode-09722

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](#VkSharingMode),
`pQueueFamilyIndices` **must** be a valid pointer to an array of
`queueFamilyIndexCount` `uint32_t` values

* 
[](#VUID-VkTensorCreateInfoARM-sharingMode-09723) VUID-VkTensorCreateInfoARM-sharingMode-09723

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](#VkSharingMode),
`queueFamilyIndexCount` **must** be greater than `1`

* 
[](#VUID-VkTensorCreateInfoARM-sharingMode-09725) VUID-VkTensorCreateInfoARM-sharingMode-09725

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](#VkSharingMode), each element
of `pQueueFamilyIndices` **must** be unique and **must** be less than
`pQueueFamilyPropertyCount` returned by either
[vkGetPhysicalDeviceQueueFamilyProperties](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties) or
[vkGetPhysicalDeviceQueueFamilyProperties2](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties2) for the
`physicalDevice` that was used to create `device`

* 
[](#VUID-VkTensorCreateInfoARM-pNext-09864) VUID-VkTensorCreateInfoARM-pNext-09864

If the `pNext` chain includes a
[VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM) structure, its
`handleTypes` member **must** only contain bits that are also in
[VkExternalTensorPropertiesARM](capabilities.html#VkExternalTensorPropertiesARM)::`externalMemoryProperties.compatibleHandleTypes`,
as returned by [vkGetPhysicalDeviceExternalTensorPropertiesARM](capabilities.html#vkGetPhysicalDeviceExternalTensorPropertiesARM) with
`pExternalTensorInfo->handleType` equal to any one of the handle
types specified in
[VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM)::`handleTypes`

* 
[](#VUID-VkTensorCreateInfoARM-flags-09726) VUID-VkTensorCreateInfoARM-flags-09726

If `flags` includes
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM), the
[`descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay)
feature **must** be enabled

* 
[](#VUID-VkTensorCreateInfoARM-pNext-09727) VUID-VkTensorCreateInfoARM-pNext-09727

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) structure, `flags`
**must** contain
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM)

* 
[](#VUID-VkTensorCreateInfoARM-pDescription-09728) VUID-VkTensorCreateInfoARM-pDescription-09728

If `pDescription->usage` does not have any of the following bits set
(i.e. if it is not possible to create a tensor view for this tensor),
then the [format features](#resources-tensor-view-format-features) **must**
contain the format feature flags required by the `usage` flags for
`pDescription->format` as indicated in the
[Format Feature Dependent Usage Flags](formats.html#format-feature-dependent-usage-flags) section

[VK_TENSOR_USAGE_SHADER_BIT_ARM](#VkTensorUsageFlagBitsARM)

* 
[VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](#VkTensorUsageFlagBitsARM)

[](#VUID-VkTensorCreateInfoARM-protectedMemory-09729) VUID-VkTensorCreateInfoARM-protectedMemory-09729

If the [`protectedMemory`](features.html#features-protectedMemory) feature is not
enabled, `flags` **must** not contain
[VK_TENSOR_CREATE_PROTECTED_BIT_ARM](#VkTensorCreateFlagBitsARM)

[](#VUID-VkTensorCreateInfoARM-flags-11395) VUID-VkTensorCreateInfoARM-flags-11395

If [VkOpaqueCaptureDataCreateInfoEXT](#VkOpaqueCaptureDataCreateInfoEXT)::pData is not `NULL`,
`flags` **must** contain
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM)

[](#VUID-VkTensorCreateInfoARM-flags-11396) VUID-VkTensorCreateInfoARM-flags-11396

If `flags` contains
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM),
[VkOpaqueCaptureDataCreateInfoEXT](#VkOpaqueCaptureDataCreateInfoEXT)::`pData->size` **must** be equal
to [    `imageCaptureReplayOpaqueDataSize`](limits.html#limits-imageCaptureReplayOpaqueDataSize)

Valid Usage (Implicit)

* 
[](#VUID-VkTensorCreateInfoARM-sType-sType) VUID-VkTensorCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_CREATE_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTensorCreateInfoARM-pNext-pNext) VUID-VkTensorCreateInfoARM-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM), [VkOpaqueCaptureDataCreateInfoEXT](#VkOpaqueCaptureDataCreateInfoEXT), or [VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT)

* 
[](#VUID-VkTensorCreateInfoARM-sType-unique) VUID-VkTensorCreateInfoARM-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkTensorCreateInfoARM-flags-parameter) VUID-VkTensorCreateInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkTensorCreateFlagBitsARM](#VkTensorCreateFlagBitsARM) values

* 
[](#VUID-VkTensorCreateInfoARM-pDescription-parameter) VUID-VkTensorCreateInfoARM-pDescription-parameter

 `pDescription` **must** be a valid pointer to a valid [VkTensorDescriptionARM](#VkTensorDescriptionARM) structure

* 
[](#VUID-VkTensorCreateInfoARM-sharingMode-parameter) VUID-VkTensorCreateInfoARM-sharingMode-parameter

 `sharingMode` **must** be a valid [VkSharingMode](#VkSharingMode) value

Bits which **can** be set in [VkTensorCreateInfoARM](#VkTensorCreateInfoARM)::`flags`,
specifying additional parameters of a tensor, are:

// Provided by VK_ARM_tensors
// Flag bits for VkTensorCreateFlagBitsARM
typedef VkFlags64 VkTensorCreateFlagBitsARM;
static const VkTensorCreateFlagBitsARM VK_TENSOR_CREATE_MUTABLE_FORMAT_BIT_ARM = 0x00000001ULL;
static const VkTensorCreateFlagBitsARM VK_TENSOR_CREATE_PROTECTED_BIT_ARM = 0x00000002ULL;
// Provided by VK_EXT_descriptor_heap with VK_ARM_tensors
static const VkTensorCreateFlagBitsARM VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM = 0x00000008ULL;
// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
static const VkTensorCreateFlagBitsARM VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM = 0x00000004ULL;

* 
[VK_TENSOR_CREATE_MUTABLE_FORMAT_BIT_ARM](#VkTensorCreateFlagBitsARM) specifies that the tensor
**can** be used to create a `VkTensorViewARM` with a different format
from the tensor.

* 
[VK_TENSOR_CREATE_PROTECTED_BIT_ARM](#VkTensorCreateFlagBitsARM) specifies that the tensor is a
protected tensor.

* 
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](#VkTensorCreateFlagBitsARM)
specifies that the tensor **can** be used with descriptor buffers when
capturing and replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) for more detail.

// Provided by VK_ARM_tensors
typedef VkFlags64 VkTensorCreateFlagsARM;

`VkTensorCreateFlagsARM` is a bitmask type for setting a mask of zero or
more [VkTensorCreateFlagBitsARM](#VkTensorCreateFlagBitsARM).

To define a set of external memory handle types that **may** be used as backing
store for a tensor, add a [VkExternalMemoryTensorCreateInfoARM](#VkExternalMemoryTensorCreateInfoARM)
structure to the `pNext` chain of the [VkTensorCreateInfoARM](#VkTensorCreateInfoARM)
structure.

The `VkExternalMemoryTensorCreateInfoARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkExternalMemoryTensorCreateInfoARM {
    VkStructureType                    sType;
    const void*                        pNext;
    VkExternalMemoryHandleTypeFlags    handleTypes;
} VkExternalMemoryTensorCreateInfoARM;

|  | A `VkExternalMemoryTensorCreateInfoARM` structure with a non-zero
| --- | --- |
`handleTypes` field must be included in the creation parameters for a
tensor that will be bound to memory that is either exported or imported. |

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is zero or a bitmask of
[VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) specifying one or more external
memory handle types.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalMemoryTensorCreateInfoARM-sType-sType) VUID-VkExternalMemoryTensorCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_TENSOR_CREATE_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExternalMemoryTensorCreateInfoARM-handleTypes-parameter) VUID-VkExternalMemoryTensorCreateInfoARM-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkTensorCreateInfoARM](#VkTensorCreateInfoARM)

To destroy a tensor, call:

// Provided by VK_ARM_tensors
void vkDestroyTensorARM(
    VkDevice                                    device,
    VkTensorARM                                 tensor,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the tensor.

* 
`tensor` is the tensor to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyTensorARM-tensor-09730) VUID-vkDestroyTensorARM-tensor-09730

All submitted commands that refer to `tensor`, either directly or
via a `VkTensorViewARM`, **must** have completed execution

* 
[](#VUID-vkDestroyTensorARM-tensor-09731) VUID-vkDestroyTensorARM-tensor-09731

If `VkAllocationCallbacks` were provided when `tensor` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyTensorARM-tensor-09732) VUID-vkDestroyTensorARM-tensor-09732

If no `VkAllocationCallbacks` were provided when `tensor` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyTensorARM-device-parameter) VUID-vkDestroyTensorARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyTensorARM-tensor-parameter) VUID-vkDestroyTensorARM-tensor-parameter

 If `tensor` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `tensor` **must** be a valid [VkTensorARM](#VkTensorARM) handle

* 
[](#VUID-vkDestroyTensorARM-pAllocator-parameter) VUID-vkDestroyTensorARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyTensorARM-tensor-parent) VUID-vkDestroyTensorARM-tensor-parent

 If `tensor` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `tensor` **must** be externally synchronized

The `VkTensorDescriptionARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkTensorDescriptionARM {
    VkStructureType          sType;
    const void*              pNext;
    VkTensorTilingARM        tiling;
    VkFormat                 format;
    uint32_t                 dimensionCount;
    const int64_t*           pDimensions;
    const int64_t*           pStrides;
    VkTensorUsageFlagsARM    usage;
} VkTensorDescriptionARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tiling` is a [VkTensorTilingARM](#VkTensorTilingARM) value specifying the tiling of
the tensor

* 
`format` is a one component [VkFormat](formats.html#VkFormat) describing the format and
type of the data elements that will be contained in the tensor.

* 
`dimensionCount` is the number of dimensions for the tensor.

* 
`pDimensions` is a pointer to an array of integers of size
`dimensionCount` providing the number of data elements in each
dimension.

* 
`pStrides` is either `NULL` or is an array of size
`dimensionCount` providing the strides in bytes for the tensor in
each dimension.

* 
`usage` is a bitmask of [VkTensorUsageFlagBitsARM](#VkTensorUsageFlagBitsARM) specifying
the usage of the tensor.

When describing a tensor created with [VK_TENSOR_TILING_OPTIMAL_ARM](#VkTensorTilingARM),
`pStrides` must be equal to `NULL`.
When describing a tensor created with [VK_TENSOR_TILING_LINEAR_ARM](#VkTensorTilingARM),
`pStrides` is either an array of size `dimensionCount` or `NULL`.

The formats that **must** be supported for `format` are documented in
[Mandatory tensor format support](formats.html#features-formats-mandatory-features-tensor).

Each element in the `pStrides` array describes the offset in bytes
between increments of the given dimension.
For example, `pStrides`[0] describes the offset between element
[x0,x1,x2,x3] and element [x0+1,x1,x2,x3].
The `pStrides` array **can** be used to determine whether a tensor is
*packed* or not.
If `pStrides`[`dimensionCount`-1] is equal to the size of a tensor
element and for each dimension `n` greater than 0 and less than
`dimensionCount`, `pStrides`[n-1] is equal to `pStrides`[n] *
`pDimensions`[n], then the tensor is a packed tensor.
If the [tensorNonPacked](features.html#features-tensorNonPacked) feature is not enabled,
the tensor **must** be a packed tensor.

When a tensor is created with [VK_TENSOR_TILING_LINEAR_ARM](#VkTensorTilingARM) and
`pStrides` equal to `NULL` the tensor strides are calculated by the
vulkan implementation such that the resulting tensor is a packed tensor.

Expressed as an addressing formula, the starting byte of an element in a
4-dimensional, for example, linear tensor has address:

// Assume (x0,x1,x2,x3) are in units of elements.

address(x0,x1,x2,x3) = x0*pStrides[0] + x1*pStrides[1] + x2*pStrides[2] + x3*pStrides[3]

Valid Usage

* 
[](#VUID-VkTensorDescriptionARM-dimensionCount-09733) VUID-VkTensorDescriptionARM-dimensionCount-09733

`dimensionCount` **must** be less than or equal to
[VkPhysicalDeviceTensorPropertiesARM](limits.html#VkPhysicalDeviceTensorPropertiesARM)::`maxTensorDimensionCount`

* 
[](#VUID-VkTensorDescriptionARM-pDimensions-09734) VUID-VkTensorDescriptionARM-pDimensions-09734

For each i where i ≤ dimensionCount-1,
`pDimensions`[i] **must** be greater than `0`

* 
[](#VUID-VkTensorDescriptionARM-pDimensions-09883) VUID-VkTensorDescriptionARM-pDimensions-09883

For each i where i ≤ dimensionCount-1,
`pDimensions`[i] **must** be less than or equal to
[    `VkPhysicalDeviceTensorPropertiesARM`::`maxPerDimensionTensorElements`](limits.html#limits-maxPerDimensionTensorElements)

* 
[](#VUID-VkTensorDescriptionARM-format-09735) VUID-VkTensorDescriptionARM-format-09735

`format` **must** not be [VK_FORMAT_UNDEFINED](formats.html#VkFormat) and **must** be a
one-component [VkFormat](formats.html#VkFormat)

* 
[](#VUID-VkTensorDescriptionARM-pStrides-09736) VUID-VkTensorDescriptionARM-pStrides-09736

`pStrides`[`dimensionCount`-1] **must** equal the size in
bytes of a tensor element

* 
[](#VUID-VkTensorDescriptionARM-pStrides-09737) VUID-VkTensorDescriptionARM-pStrides-09737

For each i, `pStrides`[i] **must** be a multiple of the
element size

* 
[](#VUID-VkTensorDescriptionARM-pStrides-09738) VUID-VkTensorDescriptionARM-pStrides-09738

For each i, `pStrides`[i] **must** be greater than `0` and
less than or equal to
[VkPhysicalDeviceTensorPropertiesARM](limits.html#VkPhysicalDeviceTensorPropertiesARM)::`maxTensorStride`

* 
[](#VUID-VkTensorDescriptionARM-pStrides-09884) VUID-VkTensorDescriptionARM-pStrides-09884

`pStrides`[0] × `pDimensions`[0] **must** be less than
or equal to [    `VkPhysicalDeviceTensorPropertiesARM`::`maxTensorSize`](limits.html#limits-maxTensorSize)

* 
[](#VUID-VkTensorDescriptionARM-pStrides-09739) VUID-VkTensorDescriptionARM-pStrides-09739

For each i greater than 0, `pStrides`[i-1] **must** be
greater than or equal to `pStrides`[i] ×
`pDimensions`[i] so that no two elements of the tensor reference
the same memory address

* 
[](#VUID-VkTensorDescriptionARM-None-09740) VUID-VkTensorDescriptionARM-None-09740

If the [tensorNonPacked](features.html#features-tensorNonPacked) feature is not
enabled, then the members of [VkTensorDescriptionARM](#VkTensorDescriptionARM) **must** describe
a packed tensor

* 
[](#VUID-VkTensorDescriptionARM-tiling-09741) VUID-VkTensorDescriptionARM-tiling-09741

If `tiling` is [VK_TENSOR_TILING_OPTIMAL_ARM](#VkTensorTilingARM) and `usage` is
[VK_TENSOR_USAGE_IMAGE_ALIASING_BIT_ARM](#VkTensorUsageFlagBitsARM) then the size of the tensor
along its innermost dimension, i.e.
`pDimensions`[`dimensionCount` - 1], **must** be less than or
equal to `4`

* 
[](#VUID-VkTensorDescriptionARM-tiling-09742) VUID-VkTensorDescriptionARM-tiling-09742

If `tiling` is [VK_TENSOR_TILING_LINEAR_ARM](#VkTensorTilingARM) then
[VK_TENSOR_USAGE_IMAGE_ALIASING_BIT_ARM](#VkTensorUsageFlagBitsARM) **must** not be set in
`usage`

Valid Usage (Implicit)

* 
[](#VUID-VkTensorDescriptionARM-sType-sType) VUID-VkTensorDescriptionARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_DESCRIPTION_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTensorDescriptionARM-tiling-parameter) VUID-VkTensorDescriptionARM-tiling-parameter

 `tiling` **must** be a valid [VkTensorTilingARM](#VkTensorTilingARM) value

* 
[](#VUID-VkTensorDescriptionARM-format-parameter) VUID-VkTensorDescriptionARM-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

* 
[](#VUID-VkTensorDescriptionARM-pDimensions-parameter) VUID-VkTensorDescriptionARM-pDimensions-parameter

 `pDimensions` **must** be a valid pointer to an array of `dimensionCount` `int64_t` values

* 
[](#VUID-VkTensorDescriptionARM-pStrides-parameter) VUID-VkTensorDescriptionARM-pStrides-parameter

 If `pStrides` is not `NULL`, `pStrides` **must** be a valid pointer to an array of `dimensionCount` `int64_t` values

* 
[](#VUID-VkTensorDescriptionARM-usage-parameter) VUID-VkTensorDescriptionARM-usage-parameter

 `usage` **must** be a valid combination of [VkTensorUsageFlagBitsARM](#VkTensorUsageFlagBitsARM) values

* 
[](#VUID-VkTensorDescriptionARM-usage-requiredbitmask) VUID-VkTensorDescriptionARM-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-VkTensorDescriptionARM-dimensionCount-arraylength) VUID-VkTensorDescriptionARM-dimensionCount-arraylength

 `dimensionCount` **must** be greater than `0`

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineConstantARM](VK_ARM_data_graph/graphs.html#VkDataGraphPipelineConstantARM)

* 
[VkDataGraphPipelineResourceInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphPipelineResourceInfoARM)

Bits which **can** be set in [VkTensorDescriptionARM](#VkTensorDescriptionARM)::`usage`,
specifying usage behavior of a tensor, are:

// Provided by VK_ARM_tensors
// Flag bits for VkTensorUsageFlagBitsARM
typedef VkFlags64 VkTensorUsageFlagBitsARM;
static const VkTensorUsageFlagBitsARM VK_TENSOR_USAGE_SHADER_BIT_ARM = 0x00000002ULL;
static const VkTensorUsageFlagBitsARM VK_TENSOR_USAGE_TRANSFER_SRC_BIT_ARM = 0x00000004ULL;
static const VkTensorUsageFlagBitsARM VK_TENSOR_USAGE_TRANSFER_DST_BIT_ARM = 0x00000008ULL;
static const VkTensorUsageFlagBitsARM VK_TENSOR_USAGE_IMAGE_ALIASING_BIT_ARM = 0x00000010ULL;
// Provided by VK_ARM_data_graph
static const VkTensorUsageFlagBitsARM VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM = 0x00000020ULL;

* 
[VK_TENSOR_USAGE_SHADER_BIT_ARM](#VkTensorUsageFlagBitsARM) specifies that the tensor **can** be
used to create a `VkTensorViewARM` suitable for occupying a
`VkDescriptorSet` slot of type [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType)
accessed by shader stages.

* 
[VK_TENSOR_USAGE_TRANSFER_SRC_BIT_ARM](#VkTensorUsageFlagBitsARM) specifies that the tensor
**can** be used as the source of a *transfer command* (see the definition
of
[](synchronization.html#synchronization-pipeline-stages-transfer)[VK_PIPELINE_STAGE_TRANSFER_BIT](synchronization.html#VkPipelineStageFlagBits)).

* 
[VK_TENSOR_USAGE_TRANSFER_DST_BIT_ARM](#VkTensorUsageFlagBitsARM) specifies that the tensor
**can** be used as the destination of a transfer command.

* 
[VK_TENSOR_USAGE_IMAGE_ALIASING_BIT_ARM](#VkTensorUsageFlagBitsARM) specifies that the tensor
**can** be bound to a range of memory aliased with an image created with
[VK_IMAGE_TILING_OPTIMAL](#VkImageTiling).
See [Memory Aliasing](#resources-memory-aliasing) for a complete set of rules for
tensor/image aliasing.

* 
[VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](#VkTensorUsageFlagBitsARM) specifies that the tensor **can**
be used to create a `VkTensorViewARM` suitable for occupying a
`VkDescriptorSet` slot of type [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptorsets.html#VkDescriptorType)
accessed by [data graph pipelines](VK_ARM_data_graph/graphs.html#graphs-pipelines).

// Provided by VK_ARM_tensors
typedef VkFlags64 VkTensorUsageFlagsARM;

`VkTensorUsageFlags` is a bitmask type for setting a mask of zero or
more [VkTensorUsageFlagBitsARM](#VkTensorUsageFlagBitsARM).

Possible values of [VkTensorCreateInfoARM](#VkTensorCreateInfoARM)::`tiling`, specifying the
tiling arrangement of elements in the tensor, are:

// Provided by VK_ARM_tensors
typedef enum VkTensorTilingARM {
    VK_TENSOR_TILING_OPTIMAL_ARM = 0,
    VK_TENSOR_TILING_LINEAR_ARM = 1,
} VkTensorTilingARM;

* 
[VK_TENSOR_TILING_OPTIMAL_ARM](#VkTensorTilingARM) specifies optimal tiling (elements
are laid out in an implementation-dependent arrangement, for more
efficient memory access).

* 
[VK_TENSOR_TILING_LINEAR_ARM](#VkTensorTilingARM) specifies linear tiling (elements are
laid out linearly and the offset between each element is determined by
the [strides](#resources-tensor-description-strides) of the tensor).

Tensor objects are not directly accessed by pipelines for reading or writing
tensor data.
Instead, *tensor views* representing the tensor subresources and containing
additional metadata are used for that purpose.
Views **must** be created on tensors of compatible types.

Tensor views are represented by `VkTensorViewARM` handles:

// Provided by VK_ARM_tensors
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkTensorViewARM)

To create a tensor view, call:

// Provided by VK_ARM_tensors
VkResult vkCreateTensorViewARM(
    VkDevice                                    device,
    const VkTensorViewCreateInfoARM*            pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkTensorViewARM*                            pView);

* 
`device` is the logical device that creates the tensor view.

* 
`pCreateInfo` is a pointer to an instance of the
`VkTensorViewCreateInfoARM` structure containing parameters to be
used to create the tensor view.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pView` is a pointer to a [VkTensorViewARM](#VkTensorViewARM) handle in which the
resulting tensor view object is returned.

Some of the tensor creation parameters are inherited by the view.
In particular, other than format, the tensor view creation inherits all
other parameters from the tensor.

The remaining parameters are contained in `pCreateInfo`.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateTensorViewARM-device-parameter) VUID-vkCreateTensorViewARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateTensorViewARM-pCreateInfo-parameter) VUID-vkCreateTensorViewARM-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkTensorViewCreateInfoARM](#VkTensorViewCreateInfoARM) structure

* 
[](#VUID-vkCreateTensorViewARM-pAllocator-parameter) VUID-vkCreateTensorViewARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateTensorViewARM-pView-parameter) VUID-vkCreateTensorViewARM-pView-parameter

 `pView` **must** be a valid pointer to a [VkTensorViewARM](#VkTensorViewARM) handle

* 
[](#VUID-vkCreateTensorViewARM-device-queuecount) VUID-vkCreateTensorViewARM-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkTensorViewCreateInfoARM` structure is defined as:

// Provided by VK_EXT_descriptor_heap, VK_ARM_tensors
typedef struct VkTensorViewCreateInfoARM {
    VkStructureType               sType;
    const void*                   pNext;
    VkTensorViewCreateFlagsARM    flags;
    VkTensorARM                   tensor;
    VkFormat                      format;
} VkTensorViewCreateInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`tensor` is a [VkTensorARM](#VkTensorARM) on which the view will be created.

* 
`format` is a [VkFormat](formats.html#VkFormat) describing the format and type used to
interpret elements in the tensor.

If `tensor` was created with the
[VK_TENSOR_CREATE_MUTABLE_FORMAT_BIT_ARM](#VkTensorCreateFlagBitsARM) flag, `format` **can** be
different from the tensor’s format, but if they are not equal they **must** be
*compatible*.
Tensor format compatibility is defined in the
[Format Compatibility Classes](formats.html#formats-compatibility-classes) section.
Views of compatible formats will have the same mapping between element
locations irrespective of the `format`, with only the interpretation of
the bit pattern changing.

|  | Values intended to be used with one view format **may** not be exactly
| --- | --- |
preserved when written or read through a different format.
For example, an integer value that happens to have the bit pattern of a
floating-point denorm or NaN **may** be flushed or canonicalized when written
or read through a view with a floating-point format.
Similarly, a value written through a signed normalized format that has a bit
pattern exactly equal to -2b **may** be changed to -2b +  1
as described in [Conversion from Normalized Fixed-Point to Floating-Point](fundamentals.html#fundamentals-fixedfpconv). |

Valid Usage

* 
[](#VUID-VkTensorViewCreateInfoARM-tensor-09743) VUID-VkTensorViewCreateInfoARM-tensor-09743

If `tensor` was not created with
[VK_TENSOR_CREATE_MUTABLE_FORMAT_BIT_ARM](#VkTensorCreateFlagBitsARM) flag, `format` **must**
be identical to the `format` used to create `tensor`

* 
[](#VUID-VkTensorViewCreateInfoARM-tensor-09744) VUID-VkTensorViewCreateInfoARM-tensor-09744

If `tensor` was created with
[VK_TENSOR_CREATE_MUTABLE_FORMAT_BIT_ARM](#VkTensorCreateFlagBitsARM) flag, `format` **must**
be compatible with the `format` used to create `tensor`, as
defined in [Format Compatibility    Classes](formats.html#formats-compatibility-classes)

* 
[](#VUID-VkTensorViewCreateInfoARM-flags-09745) VUID-VkTensorViewCreateInfoARM-flags-09745

If `flags` includes
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](#VkTensorViewCreateFlagBitsARM),
the
[`descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay)
feature **must** be enabled

* 
[](#VUID-VkTensorViewCreateInfoARM-pNext-09746) VUID-VkTensorViewCreateInfoARM-pNext-09746

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) structure, `flags`
**must** contain
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](#VkTensorViewCreateFlagBitsARM)

* 
[](#VUID-VkTensorViewCreateInfoARM-usage-09747) VUID-VkTensorViewCreateInfoARM-usage-09747

The `usage` flags of `tensor` **must** have at least one of the
following bits set:

[VK_TENSOR_USAGE_SHADER_BIT_ARM](#VkTensorUsageFlagBitsARM)

* 
[VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](#VkTensorUsageFlagBitsARM)

[](#VUID-VkTensorViewCreateInfoARM-usage-09748) VUID-VkTensorViewCreateInfoARM-usage-09748

The tensor view’s [format    features](#resources-tensor-view-format-features) **must** contain the format feature flags required by the
`usage` flags of `tensor` for `format` as indicated in the
[Format Feature Dependent Usage Flags](formats.html#format-feature-dependent-usage-flags) section

[](#VUID-VkTensorViewCreateInfoARM-tensor-09749) VUID-VkTensorViewCreateInfoARM-tensor-09749

If `tensor` is non-sparse then it **must** be bound completely and
contiguously to a single [VkDeviceMemory](memory.html#VkDeviceMemory) object

Valid Usage (Implicit)

* 
[](#VUID-VkTensorViewCreateInfoARM-sType-sType) VUID-VkTensorViewCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_VIEW_CREATE_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTensorViewCreateInfoARM-pNext-pNext) VUID-VkTensorViewCreateInfoARM-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT)

* 
[](#VUID-VkTensorViewCreateInfoARM-sType-unique) VUID-VkTensorViewCreateInfoARM-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkTensorViewCreateInfoARM-flags-parameter) VUID-VkTensorViewCreateInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkTensorViewCreateFlagBitsARM](#VkTensorViewCreateFlagBitsARM) values

* 
[](#VUID-VkTensorViewCreateInfoARM-tensor-parameter) VUID-VkTensorViewCreateInfoARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](#VkTensorARM) handle

* 
[](#VUID-VkTensorViewCreateInfoARM-format-parameter) VUID-VkTensorViewCreateInfoARM-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

Bits which **can** be set in [VkTensorViewCreateInfoARM](#VkTensorViewCreateInfoARM)::`flags`,
specifying additional parameters of an tensor, are:

// Provided by VK_ARM_tensors
// Flag bits for VkTensorViewCreateFlagBitsARM
typedef VkFlags64 VkTensorViewCreateFlagBitsARM;
// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
static const VkTensorViewCreateFlagBitsARM VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM = 0x00000001ULL;

* 
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](#VkTensorViewCreateFlagBitsARM)
specifies that the tensor view **can** be used with descriptor buffers when
capturing and replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](descriptorsets.html#VkOpaqueCaptureDescriptorDataCreateInfoEXT) for more detail.

// Provided by VK_EXT_descriptor_heap, VK_ARM_tensors
typedef VkFlags64 VkTensorViewCreateFlagsARM;

`VkTensorViewCreateFlagsARM` is a bitmask type for setting a mask of
zero or more [VkTensorViewCreateFlagBitsARM](#VkTensorViewCreateFlagBitsARM).

To destroy a tensor view, call:

// Provided by VK_ARM_tensors
void vkDestroyTensorViewARM(
    VkDevice                                    device,
    VkTensorViewARM                             tensorView,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the tensor view.

* 
`tensorView` is the tensor view to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyTensorViewARM-tensorView-09750) VUID-vkDestroyTensorViewARM-tensorView-09750

All submitted commands that refer to `tensorView` **must** have
completed execution

* 
[](#VUID-vkDestroyTensorViewARM-tensorView-09751) VUID-vkDestroyTensorViewARM-tensorView-09751

If `VkAllocationCallbacks` were provided when `tensorView` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyTensorViewARM-tensorView-09752) VUID-vkDestroyTensorViewARM-tensorView-09752

If no `VkAllocationCallbacks` were provided when `tensorView`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyTensorViewARM-device-parameter) VUID-vkDestroyTensorViewARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyTensorViewARM-tensorView-parameter) VUID-vkDestroyTensorViewARM-tensorView-parameter

 If `tensorView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `tensorView` **must** be a valid [VkTensorViewARM](#VkTensorViewARM) handle

* 
[](#VUID-vkDestroyTensorViewARM-pAllocator-parameter) VUID-vkDestroyTensorViewARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyTensorViewARM-tensorView-parent) VUID-vkDestroyTensorViewARM-tensorView-parent

 If `tensorView` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `tensorView` **must** be externally synchronized

Valid usage of a [VkTensorViewARM](#VkTensorViewARM) **may** be constrained by the tensor
view’s format features, defined below.
Such constraints are documented in the affected valid usage statement.

* 
If the view’s tensor was created with [VK_TENSOR_TILING_LINEAR_ARM](#VkTensorTilingARM),
then the tensor view’s set of *format features* is the value of
[VkTensorFormatPropertiesARM](formats.html#VkTensorFormatPropertiesARM)::`linearTilingTensorFeatures`
found by calling [vkGetPhysicalDeviceFormatProperties2](formats.html#vkGetPhysicalDeviceFormatProperties2) on the same
`format` as [VkTensorViewCreateInfoARM](#VkTensorViewCreateInfoARM)::`format`.

* 
If the view’s tensor was created with
[VK_TENSOR_TILING_OPTIMAL_ARM](#VkTensorTilingARM), then the tensor view’s set of
*format features* is the value of
[VkTensorFormatPropertiesARM](formats.html#VkTensorFormatPropertiesARM)::`optimalTilingTensorFeatures`
found by calling [vkGetPhysicalDeviceFormatProperties2](formats.html#vkGetPhysicalDeviceFormatProperties2) on the same
`format` as [VkTensorViewCreateInfoARM](#VkTensorViewCreateInfoARM)::`format`.
