# VkDataGraphPipelinePropertyQueryResultARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelinePropertyQueryResultARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelinePropertyQueryResultARM - Structure describing a data graph pipeline property query or result

The `VkDataGraphPipelinePropertyQueryResultARM` structure is defined as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelinePropertyQueryResultARM {
    VkStructureType                   sType;
    void*                             pNext;
    VkDataGraphPipelinePropertyARM    property;
    VkBool32                          isText;
    size_t                            dataSize;
    void*                             pData;
} VkDataGraphPipelinePropertyQueryResultARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`property` is a [VkDataGraphPipelinePropertyARM](VkDataGraphPipelinePropertyARM.html) specifying the
property of the data graph pipeline being queried.

* 
`isText` specifies whether the returned data is text or opaque data.
If `isText` is [VK_TRUE](VK_TRUE.html) then the data returned in `pData`
is text and guaranteed to be a null-terminated UTF-8 string.

* 
`dataSize` is an integer related to the size, in bytes, of the data,
as described below.

* 
`pData` is either `NULL` or a pointer to a block of memory into
which the implementation will return the property data.

If `pData` is `NULL`, then the size, in bytes, of the property data is
returned in `dataSize`.
Otherwise, `dataSize` must be the size of the buffer, in bytes, pointed
to by `pData` and on return `dataSize` is overwritten with the
number of bytes of data actually written to `pData` including any
trailing NUL character.
If `dataSize` is less than the size, in bytes, of the property data, at
most `dataSize` bytes of data will be written to `pData`, and
[VK_INCOMPLETE](VkResult.html) will be returned by
[vkGetDataGraphPipelinePropertiesARM](vkGetDataGraphPipelinePropertiesARM.html) instead of [VK_SUCCESS](VkResult.html), to
indicate that not all the available property data was returned.
If `isText` is [VK_TRUE](VK_TRUE.html) and `pData` is not `NULL` and
`dataSize` is not zero, the last byte written to `pData` will be a
NUL character.

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelinePropertyQueryResultARM-sType-sType) VUID-VkDataGraphPipelinePropertyQueryResultARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_PROPERTY_QUERY_RESULT_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelinePropertyQueryResultARM-pNext-pNext) VUID-VkDataGraphPipelinePropertyQueryResultARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDataGraphPipelinePropertyQueryResultARM-property-parameter) VUID-VkDataGraphPipelinePropertyQueryResultARM-property-parameter

 `property` **must** be a valid [VkDataGraphPipelinePropertyARM](VkDataGraphPipelinePropertyARM.html) value

* 
[](#VUID-VkDataGraphPipelinePropertyQueryResultARM-pData-parameter) VUID-VkDataGraphPipelinePropertyQueryResultARM-pData-parameter

 If `dataSize` is not `0`, and `pData` is not `NULL`, `pData` **must** be a valid pointer to an array of `dataSize` bytes

[VK_ARM_data_graph](VK_ARM_data_graph.html), `VkBool32`, [VkDataGraphPipelinePropertyARM](VkDataGraphPipelinePropertyARM.html), [VkStructureType](VkStructureType.html), [vkGetDataGraphPipelinePropertiesARM](vkGetDataGraphPipelinePropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelinePropertyQueryResultARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
