# vkWriteMicromapsPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkWriteMicromapsPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkWriteMicromapsPropertiesEXT - Query micromap meta-data on the host

To query micromap size parameters on the host, call:

// Provided by VK_EXT_opacity_micromap
VkResult vkWriteMicromapsPropertiesEXT(
    VkDevice                                    device,
    uint32_t                                    micromapCount,
    const VkMicromapEXT*                        pMicromaps,
    VkQueryType                                 queryType,
    size_t                                      dataSize,
    void*                                       pData,
    size_t                                      stride);

* 
`device` is the device which owns the micromaps in `pMicromaps`.

* 
`micromapCount` is the count of micromaps for which to query the
property.

* 
`pMicromaps` is a pointer to an array of existing previously built
micromaps.

* 
`queryType` is a [VkQueryType](VkQueryType.html) value specifying the property to
be queried.

* 
`dataSize` is the size in bytes of the buffer pointed to by
`pData`.

* 
`pData` is a pointer to an application-allocated buffer where the
results will be written.

* 
`stride` is the stride in bytes between results for individual
queries within `pData`.

This command fulfills the same task as
[vkCmdWriteMicromapsPropertiesEXT](vkCmdWriteMicromapsPropertiesEXT.html) but is executed by the host.

Valid Usage

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-07501) VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-07501

All micromaps in `pMicromaps` **must** have been constructed prior to
the execution of this command

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-07502) VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-07502

All micromaps in `pMicromaps` **must** have been constructed with
[VK_BUILD_MICROMAP_ALLOW_COMPACTION_BIT_EXT](VkBuildMicromapFlagBitsEXT.html) if `queryType` is
[VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](VkQueryType.html)

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-queryType-07503) VUID-vkWriteMicromapsPropertiesEXT-queryType-07503

`queryType` **must** be [VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](VkQueryType.html)
or [VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](VkQueryType.html)

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-queryType-10071) VUID-vkWriteMicromapsPropertiesEXT-queryType-10071

If `queryType` is
[VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](VkQueryType.html) or
[VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](VkQueryType.html) then `stride` **must**
be a multiple of the size of `VkDeviceSize`

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-queryType-10072) VUID-vkWriteMicromapsPropertiesEXT-queryType-10072

If `queryType` is
[VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](VkQueryType.html) or
[VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](VkQueryType.html) then `pData` **must**
point to a `VkDeviceSize`

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-dataSize-07576) VUID-vkWriteMicromapsPropertiesEXT-dataSize-07576

`dataSize` **must** be greater than or equal to
`micromapCount`*`stride`

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-buffer-07577) VUID-vkWriteMicromapsPropertiesEXT-buffer-07577

The `buffer` used to create each micromap in `pMicromaps` **must**
be bound to host-visible device memory

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-micromapHostCommands-07578) VUID-vkWriteMicromapsPropertiesEXT-micromapHostCommands-07578

The [    `VkPhysicalDeviceOpacityMicromapFeaturesEXT`::`micromapHostCommands`](../../../../spec/latest/chapters/features.html#features-micromapHostCommands)
feature **must** be enabled

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-buffer-07579) VUID-vkWriteMicromapsPropertiesEXT-buffer-07579

The `buffer` used to create each micromap in `pMicromaps` **must**
be bound to memory that was not allocated with multiple instances

Valid Usage (Implicit)

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-device-parameter) VUID-vkWriteMicromapsPropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-parameter) VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-parameter

 `pMicromaps` **must** be a valid pointer to an array of `micromapCount` valid [VkMicromapEXT](VkMicromapEXT.html) handles

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-queryType-parameter) VUID-vkWriteMicromapsPropertiesEXT-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](VkQueryType.html) value

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-pData-parameter) VUID-vkWriteMicromapsPropertiesEXT-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-micromapCount-arraylength) VUID-vkWriteMicromapsPropertiesEXT-micromapCount-arraylength

 `micromapCount` **must** be greater than `0`

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-dataSize-arraylength) VUID-vkWriteMicromapsPropertiesEXT-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-parent) VUID-vkWriteMicromapsPropertiesEXT-pMicromaps-parent

 Each element of `pMicromaps` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkDevice](VkDevice.html), [VkMicromapEXT](VkMicromapEXT.html), [VkQueryType](VkQueryType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkWriteMicromapsPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
