# VkPipelineCacheHeaderVersionOne(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCacheHeaderVersionOne.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCacheHeaderVersionOne - Structure describing the layout of the pipeline cache header

Version one of the pipeline cache header is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineCacheHeaderVersionOne {
    uint32_t                        headerSize;
    VkPipelineCacheHeaderVersion    headerVersion;
    uint32_t                        vendorID;
    uint32_t                        deviceID;
    uint8_t                         pipelineCacheUUID[VK_UUID_SIZE];
} VkPipelineCacheHeaderVersionOne;

* 
`headerSize` is the length in bytes of the pipeline cache header.

* 
`headerVersion` is a [VkPipelineCacheHeaderVersion](VkPipelineCacheHeaderVersion.html) value
specifying the version of the header.
A consumer of the pipeline cache **should** use the cache version to
interpret the remainder of the cache header.
`headerVersion` **must** be written as exactly 4 bytes.

* 
`vendorID` is the `VkPhysicalDeviceProperties`::`vendorID`
of the implementation.

* 
`deviceID` is the `VkPhysicalDeviceProperties`::`deviceID`
of the implementation.

* 
`pipelineCacheUUID` is the
`VkPhysicalDeviceProperties`::`pipelineCacheUUID` of the
implementation.

Unlike most structures declared by the Vulkan API, all fields of this
structure are written with the least significant byte first, regardless of
host byte-order.

The C language specification does not define the packing of structure
members.
This layout assumes tight structure member packing, with members laid out in
the order listed in the structure, and the intended size of the structure is
32 bytes.
If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values at the correct offsets.

Valid Usage

* 
[](#VUID-VkPipelineCacheHeaderVersionOne-headerSize-04967) VUID-VkPipelineCacheHeaderVersionOne-headerSize-04967

`headerSize` **must** be 32

* 
[](#VUID-VkPipelineCacheHeaderVersionOne-headerVersion-04968) VUID-VkPipelineCacheHeaderVersionOne-headerVersion-04968

`headerVersion` **must** be [VK_PIPELINE_CACHE_HEADER_VERSION_ONE](VkPipelineCacheHeaderVersion.html)

* 
[](#VUID-VkPipelineCacheHeaderVersionOne-headerSize-08990) VUID-VkPipelineCacheHeaderVersionOne-headerSize-08990

`headerSize` **must** not exceed the size of the pipeline cache

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCacheHeaderVersionOne-headerVersion-parameter) VUID-VkPipelineCacheHeaderVersionOne-headerVersion-parameter

 `headerVersion` **must** be a valid [VkPipelineCacheHeaderVersion](VkPipelineCacheHeaderVersion.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineCacheHeaderVersion](VkPipelineCacheHeaderVersion.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCacheHeaderVersionOne).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
