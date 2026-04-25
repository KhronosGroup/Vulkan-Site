# VkBufferCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBufferCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBufferCreateInfo - Structure specifying the parameters of a newly created buffer object

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkBufferCreateFlagBits](VkBufferCreateFlagBits.html) specifying
additional parameters of the buffer.

* 
`size` is the size in bytes of the buffer to be created.

* 
`usage` is a bitmask of [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html) specifying
allowed usages of the buffer.

* 
`sharingMode` is a [VkSharingMode](VkSharingMode.html) value specifying the sharing
mode of the buffer when it will be accessed by multiple queue families.

* 
`queueFamilyIndexCount` is the number of entries in the
`pQueueFamilyIndices` array.

* 
`pQueueFamilyIndices` is a pointer to an array of queue families
that will access this buffer.
It is ignored if `sharingMode` is not
[VK_SHARING_MODE_CONCURRENT](VkSharingMode.html).

`usage` defines the effective usage flags for the buffer.
If the `pNext` chain includes a [VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html)
structure, [VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html)::`usage` from that
structure is used as the effective usage instead of `usage` from this
structure.

Valid Usage

* 
[](#VUID-VkBufferCreateInfo-None-09499) VUID-VkBufferCreateInfo-None-09499

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html) structure,
`usage` **must** be a valid combination of [VkBufferUsageFlagBits](VkBufferUsageFlagBits.html)
values

* 
[](#VUID-VkBufferCreateInfo-None-09500) VUID-VkBufferCreateInfo-None-09500

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html) structure,
`usage` **must** not be 0

* 
[](#VUID-VkBufferCreateInfo-size-00912) VUID-VkBufferCreateInfo-size-00912

`size` **must** be greater than `0`

* 
[](#VUID-VkBufferCreateInfo-sharingMode-00913) VUID-VkBufferCreateInfo-sharingMode-00913

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html),
`pQueueFamilyIndices` **must** be a valid pointer to an array of
`queueFamilyIndexCount` `uint32_t` values

* 
[](#VUID-VkBufferCreateInfo-sharingMode-00914) VUID-VkBufferCreateInfo-sharingMode-00914

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html),
`queueFamilyIndexCount` **must** be greater than `1`

* 
[](#VUID-VkBufferCreateInfo-sharingMode-01419) VUID-VkBufferCreateInfo-sharingMode-01419

If `sharingMode` is [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html), each element
of `pQueueFamilyIndices` **must** be unique and **must** be less than
`pQueueFamilyPropertyCount` returned by
either [vkGetPhysicalDeviceQueueFamilyProperties2](vkGetPhysicalDeviceQueueFamilyProperties2.html) or
[vkGetPhysicalDeviceQueueFamilyProperties](vkGetPhysicalDeviceQueueFamilyProperties.html) for the
`physicalDevice` that was used to create `device`

* 
[](#VUID-VkBufferCreateInfo-flags-00915) VUID-VkBufferCreateInfo-flags-00915

If the [`sparseBinding`](../../../../spec/latest/chapters/features.html#features-sparseBinding) feature is not
enabled,
`flags` **must** not contain [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-flags-00916) VUID-VkBufferCreateInfo-flags-00916

If the [`sparseResidencyBuffer`](../../../../spec/latest/chapters/features.html#features-sparseResidencyBuffer)
feature is not enabled,
`flags` **must** not contain
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-flags-00917) VUID-VkBufferCreateInfo-flags-00917

If the [`sparseResidencyAliased`](../../../../spec/latest/chapters/features.html#features-sparseResidencyAliased)
feature is not enabled,
`flags` **must** not contain [VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-flags-00918) VUID-VkBufferCreateInfo-flags-00918

If `flags` contains [VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html) or
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](VkBufferCreateFlagBits.html), it **must** also contain
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-pNext-00920) VUID-VkBufferCreateInfo-pNext-00920

If the `pNext` chain includes a
[VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html) structure, its `handleTypes`
member **must** only contain bits that are also in
[VkExternalBufferProperties](VkExternalBufferProperties.html)::`externalMemoryProperties.compatibleHandleTypes`,
as returned by [vkGetPhysicalDeviceExternalBufferProperties](vkGetPhysicalDeviceExternalBufferProperties.html) with
`pExternalBufferInfo->handleType` equal to any one of the handle
types specified in
[VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html)::`handleTypes`

* 
[](#VUID-VkBufferCreateInfo-flags-01887) VUID-VkBufferCreateInfo-flags-01887

If the [`protectedMemory`](../../../../spec/latest/chapters/features.html#features-protectedMemory) feature is
not enabled, `flags` **must** not contain
[VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-None-01888) VUID-VkBufferCreateInfo-None-01888

If any of the bits [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html),
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html), or
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](VkBufferCreateFlagBits.html) are set,
[VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html) **must** not also be set

* 
[](#VUID-VkBufferCreateInfo-pNext-01571) VUID-VkBufferCreateInfo-pNext-01571

If the `pNext` chain includes a
[VkDedicatedAllocationBufferCreateInfoNV](VkDedicatedAllocationBufferCreateInfoNV.html) structure, and the
`dedicatedAllocation` member of the chained structure is
[VK_TRUE](VK_TRUE.html), then `flags` **must** not include
[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html),
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html), or
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-deviceAddress-02604) VUID-VkBufferCreateInfo-deviceAddress-02604

If [VkBufferDeviceAddressCreateInfoEXT](VkBufferDeviceAddressCreateInfoEXT.html)::`deviceAddress` is not
zero, `flags` **must** include
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-opaqueCaptureAddress-03337) VUID-VkBufferCreateInfo-opaqueCaptureAddress-03337

If
[VkBufferOpaqueCaptureAddressCreateInfo](VkBufferOpaqueCaptureAddressCreateInfo.html)::`opaqueCaptureAddress`
is not zero, `flags` **must** include
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-flags-03338) VUID-VkBufferCreateInfo-flags-03338

    If `flags` includes
    [VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html), the
    [](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressCaptureReplayEXT)[VkPhysicalDeviceBufferDeviceAddressFeaturesEXT](VkPhysicalDeviceBufferDeviceAddressFeaturesEXT.html)::`bufferDeviceAddressCaptureReplay`
    feature
or the
    [    `bufferDeviceAddressCaptureReplay`](../../../../spec/latest/chapters/features.html#features-bufferDeviceAddressCaptureReplay) feature
    **must** be enabled

* 
[](#VUID-VkBufferCreateInfo-usage-04813) VUID-VkBufferCreateInfo-usage-04813

If `usage` includes [VK_BUFFER_USAGE_VIDEO_DECODE_SRC_BIT_KHR](VkBufferUsageFlagBits.html)
or [VK_BUFFER_USAGE_VIDEO_DECODE_DST_BIT_KHR](VkBufferUsageFlagBits.html),
and `flags` does not include
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkBufferCreateFlagBits.html),
then the `pNext` chain **must** include a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure with `profileCount`
greater than `0` and `pProfiles` including at least one
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure with a `videoCodecOperation`
member specifying a decode operation

* 
[](#VUID-VkBufferCreateInfo-usage-04814) VUID-VkBufferCreateInfo-usage-04814

If `usage` includes [VK_BUFFER_USAGE_VIDEO_ENCODE_SRC_BIT_KHR](VkBufferUsageFlagBits.html)
or [VK_BUFFER_USAGE_VIDEO_ENCODE_DST_BIT_KHR](VkBufferUsageFlagBits.html),
and `flags` does not include
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkBufferCreateFlagBits.html),
then the `pNext` chain **must** include a
[VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html) structure with `profileCount`
greater than `0` and `pProfiles` including at least one
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure with a `videoCodecOperation`
member specifying an encode operation

* 
[](#VUID-VkBufferCreateInfo-flags-08325) VUID-VkBufferCreateInfo-flags-08325

If `flags` includes
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkBufferCreateFlagBits.html), then
[`videoMaintenance1`](../../../../spec/latest/chapters/features.html#features-videoMaintenance1) **must** be enabled

* 
[](#VUID-VkBufferCreateInfo-pNext-10783) VUID-VkBufferCreateInfo-pNext-10783

If the `pNext` chain includes a [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)
structure and for any element of its `pProfiles` member
`videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
[`videoDecodeVP9`](../../../../spec/latest/chapters/features.html#features-videoDecodeVP9) feature **must** be
enabled

* 
[](#VUID-VkBufferCreateInfo-pNext-10249) VUID-VkBufferCreateInfo-pNext-10249

If the `pNext` chain includes a [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)
structure and for any element of its `pProfiles` member
`videoCodecOperation` is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
[`videoEncodeAV1`](../../../../spec/latest/chapters/features.html#features-videoEncodeAV1) feature **must** be
enabled

* 
[](#VUID-VkBufferCreateInfo-pNext-10919) VUID-VkBufferCreateInfo-pNext-10919

If the `pNext` chain includes a
[VkVideoEncodeProfileRgbConversionInfoVALVE](VkVideoEncodeProfileRgbConversionInfoVALVE.html) structure, then the
[`videoEncodeRgbConversion`](../../../../spec/latest/chapters/features.html#features-videoEncodeRgbConversion)
feature **must** be enabled

* 
[](#VUID-VkBufferCreateInfo-size-06409) VUID-VkBufferCreateInfo-size-06409

`size` **must** be less than or equal to
[VkPhysicalDeviceMaintenance4Properties](VkPhysicalDeviceMaintenance4Properties.html)::`maxBufferSize`

* 
[](#VUID-VkBufferCreateInfo-usage-08097) VUID-VkBufferCreateInfo-usage-08097

If `usage` includes
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html), creating this
`VkBuffer` **must** not cause the total required space for all
currently valid buffers using this flag on the device to exceed
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`samplerDescriptorBufferAddressSpaceSize`
or
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`descriptorBufferAddressSpaceSize`

* 
[](#VUID-VkBufferCreateInfo-usage-08098) VUID-VkBufferCreateInfo-usage-08098

If `usage` includes
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html), creating this
`VkBuffer` **must** not cause the total required space for all
currently valid buffers using this flag on the device to exceed
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`resourceDescriptorBufferAddressSpaceSize`
or
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`descriptorBufferAddressSpaceSize`

* 
[](#VUID-VkBufferCreateInfo-flags-08099) VUID-VkBufferCreateInfo-flags-08099

If `flags` includes
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkBufferCreateFlagBits.html), the
[    `descriptorBufferCaptureReplay`](../../../../spec/latest/chapters/features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-VkBufferCreateInfo-pNext-08100) VUID-VkBufferCreateInfo-pNext-08100

If the `pNext` chain includes a
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) structure, `flags`
**must** contain
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkBufferCreateFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-usage-08101) VUID-VkBufferCreateInfo-usage-08101

If `usage` includes
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html), the
[    `descriptorBufferPushDescriptors`](../../../../spec/latest/chapters/features.html#features-descriptorBufferPushDescriptors) feature **must** be enabled

* 
[](#VUID-VkBufferCreateInfo-usage-08102) VUID-VkBufferCreateInfo-usage-08102

If `usage` includes
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)
[    `VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](../../../../spec/latest/chapters/limits.html#limits-bufferlessPushDescriptors)
**must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkBufferCreateInfo-usage-08103) VUID-VkBufferCreateInfo-usage-08103

If `usage` includes
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`usage` **must** contain at least one of
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html) or
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-tileMemoryHeap-10762) VUID-VkBufferCreateInfo-tileMemoryHeap-10762

If the [`tileMemoryHeap`](../../../../spec/latest/chapters/features.html#features-tileMemoryHeap) feature is not
enabled, `usage` **must** not include
[VK_BUFFER_USAGE_TILE_MEMORY_BIT_QCOM](VkBufferUsageFlagBits.html)

* 
[](#VUID-VkBufferCreateInfo-usage-10763) VUID-VkBufferCreateInfo-usage-10763

  If `usage` includes [VK_BUFFER_USAGE_TILE_MEMORY_BIT_QCOM](VkBufferUsageFlagBits.html), then
`flags` **must** not contain any of the following bits

[VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html)

* 
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html)

* 
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](VkBufferCreateFlagBits.html)

* 
[VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html)

* 
[VK_BUFFER_CREATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](VkBufferCreateFlagBits.html)

* 
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](VkBufferCreateFlagBits.html)

* 
[VK_BUFFER_CREATE_VIDEO_PROFILE_INDEPENDENT_BIT_KHR](VkBufferCreateFlagBits.html)

[](#VUID-VkBufferCreateInfo-usage-10764) VUID-VkBufferCreateInfo-usage-10764

If `usage` includes [VK_BUFFER_USAGE_TILE_MEMORY_BIT_QCOM](VkBufferUsageFlagBits.html), then
only the following `usages` may be set:

* 
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html)

* 
and if
[VkPhysicalDeviceTileMemoryHeapPropertiesQCOM](VkPhysicalDeviceTileMemoryHeapPropertiesQCOM.html)::`tileBufferTransfers`
is [VK_TRUE](VK_TRUE.html) then additionally
[VK_BUFFER_USAGE_TRANSFER_SRC_BIT](VkBufferUsageFlagBits.html) or
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html)

[](#VUID-VkBufferCreateInfo-flags-09641) VUID-VkBufferCreateInfo-flags-09641

If `flags` includes [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), then the
[effective usage](../../../../spec/latest/chapters/resources.html#resources-effective-buffer-usage) **must** not contain
bits other than

* 
[VK_BUFFER_USAGE_TRANSFER_SRC_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](VkBufferUsageFlagBits.html)

* 
[VK_BUFFER_USAGE_2_VIDEO_DECODE_SRC_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_VIDEO_ENCODE_DST_BIT_KHR](VkBufferUsageFlagBits2.html)

* 
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits2.html)

[](#VUID-VkBufferCreateInfo-flags-11277) VUID-VkBufferCreateInfo-flags-11277

If the
[`protectedDescriptorHeaps`](../../../../spec/latest/chapters/limits.html#limits-protectedDescriptorHeaps)
property is not supported and the [    effective usage](../../../../spec/latest/chapters/resources.html#resources-effective-buffer-usage) includes the
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits2.html) flag, `flags` **must**
not include the [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html) flag

[](#VUID-VkBufferCreateInfo-flags-11279) VUID-VkBufferCreateInfo-flags-11279

If the [`sparseDescriptorHeaps`](../../../../spec/latest/chapters/limits.html#limits-sparseDescriptorHeaps)
property is not supported and the [    effective usage](../../../../spec/latest/chapters/resources.html#resources-effective-buffer-usage) includes the
[VK_BUFFER_USAGE_2_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits2.html) flag, `flags` **must**
not include any of the [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](VkBufferCreateFlagBits.html),
[VK_BUFFER_CREATE_SPARSE_RESIDENCY_BIT](VkBufferCreateFlagBits.html), or
[VK_BUFFER_CREATE_SPARSE_ALIASED_BIT](VkBufferCreateFlagBits.html) flags

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCreateInfo-sType-sType) VUID-VkBufferCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkBufferCreateInfo-pNext-pNext) VUID-VkBufferCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBufferCollectionBufferCreateInfoFUCHSIA](VkBufferCollectionBufferCreateInfoFUCHSIA.html), [VkBufferDeviceAddressCreateInfoEXT](VkBufferDeviceAddressCreateInfoEXT.html), [VkBufferOpaqueCaptureAddressCreateInfo](VkBufferOpaqueCaptureAddressCreateInfo.html), [VkBufferUsageFlags2CreateInfo](VkBufferUsageFlags2CreateInfo.html), [VkDedicatedAllocationBufferCreateInfoNV](VkDedicatedAllocationBufferCreateInfoNV.html), [VkExternalMemoryBufferCreateInfo](VkExternalMemoryBufferCreateInfo.html), [VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html), or [VkVideoProfileListInfoKHR](VkVideoProfileListInfoKHR.html)

* 
[](#VUID-VkBufferCreateInfo-sType-unique) VUID-VkBufferCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBufferCreateInfo-flags-parameter) VUID-VkBufferCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkBufferCreateFlagBits](VkBufferCreateFlagBits.html) values

* 
[](#VUID-VkBufferCreateInfo-sharingMode-parameter) VUID-VkBufferCreateInfo-sharingMode-parameter

 `sharingMode` **must** be a valid [VkSharingMode](VkSharingMode.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBufferConstraintsInfoFUCHSIA](VkBufferConstraintsInfoFUCHSIA.html), [VkBufferCreateFlags](VkBufferCreateFlags.html), [VkBufferUsageFlags](VkBufferUsageFlags.html), [VkDeviceBufferMemoryRequirements](VkDeviceBufferMemoryRequirements.html), `VkDeviceSize`, [VkSharingMode](VkSharingMode.html), [VkStructureType](VkStructureType.html), [vkCreateBuffer](vkCreateBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkBufferCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
