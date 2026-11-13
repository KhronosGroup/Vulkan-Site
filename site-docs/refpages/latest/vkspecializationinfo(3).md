# VkSpecializationInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSpecializationInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSpecializationInfo - Structure specifying specialization information

The `VkSpecializationInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSpecializationInfo {
    uint32_t                           mapEntryCount;
    const VkSpecializationMapEntry*    pMapEntries;
    size_t                             dataSize;
    const void*                        pData;
} VkSpecializationInfo;

* 
`mapEntryCount` is the number of entries in the `pMapEntries`
array.

* 
`pMapEntries` is a pointer to an array of
`VkSpecializationMapEntry` structures, which map constant IDs to
offsets in `pData`.

* 
`dataSize` is the byte size of the `pData` buffer.

* 
`pData` contains the actual constant values to specialize with.

Valid Usage

* 
[](#VUID-VkSpecializationInfo-offset-00773) VUID-VkSpecializationInfo-offset-00773

The `offset` member of each element of `pMapEntries` **must** be
less than `dataSize`

* 
[](#VUID-VkSpecializationInfo-pMapEntries-00774) VUID-VkSpecializationInfo-pMapEntries-00774

The `size` member of each element of `pMapEntries` **must** be less
than or equal to `dataSize` minus `offset`

* 
[](#VUID-VkSpecializationInfo-constantID-04911) VUID-VkSpecializationInfo-constantID-04911

The `constantID` value of each element of `pMapEntries` **must** be
unique within `pMapEntries`

Valid Usage (Implicit)

* 
[](#VUID-VkSpecializationInfo-pMapEntries-parameter) VUID-VkSpecializationInfo-pMapEntries-parameter

 If `mapEntryCount` is not `0`, `pMapEntries` **must** be a valid pointer to an array of `mapEntryCount` valid [VkSpecializationMapEntry](VkSpecializationMapEntry.html) structures

* 
[](#VUID-VkSpecializationInfo-pData-parameter) VUID-VkSpecializationInfo-pData-parameter

 If `dataSize` is not `0`, `pData` **must** be a valid pointer to an array of `dataSize` bytes

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html), [VkSpecializationMapEntry](VkSpecializationMapEntry.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkSpecializationInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
