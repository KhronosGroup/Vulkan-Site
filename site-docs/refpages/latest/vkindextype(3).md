# VkIndexType(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkIndexType.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkIndexType - Type of index buffer indices

Possible values of
[vkCmdBindIndexBuffer2](vkCmdBindIndexBuffer2.html)::`indexType` and
[vkCmdBindIndexBuffer](vkCmdBindIndexBuffer.html)::`indexType`, specifying the size of indices,
are:

// Provided by VK_VERSION_1_0
typedef enum VkIndexType {
    VK_INDEX_TYPE_UINT16 = 0,
    VK_INDEX_TYPE_UINT32 = 1,
  // Provided by VK_VERSION_1_4
    VK_INDEX_TYPE_UINT8 = 1000265000,
  // Provided by VK_KHR_acceleration_structure
    VK_INDEX_TYPE_NONE_KHR = 1000165000,
  // Provided by VK_NV_ray_tracing
    VK_INDEX_TYPE_NONE_NV = VK_INDEX_TYPE_NONE_KHR,
  // Provided by VK_EXT_index_type_uint8
    VK_INDEX_TYPE_UINT8_EXT = VK_INDEX_TYPE_UINT8,
  // Provided by VK_KHR_index_type_uint8
    VK_INDEX_TYPE_UINT8_KHR = VK_INDEX_TYPE_UINT8,
} VkIndexType;

* 
[VK_INDEX_TYPE_UINT16](#) specifies that indices are 16-bit unsigned
integer values.

* 
[VK_INDEX_TYPE_UINT32](#) specifies that indices are 32-bit unsigned
integer values.

* 
[VK_INDEX_TYPE_NONE_KHR](#) specifies that no indices are provided.

* 
[VK_INDEX_TYPE_UINT8](#) specifies that indices are 8-bit unsigned
integer values.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAccelerationStructureGeometryLinearSweptSpheresDataNV](VkAccelerationStructureGeometryLinearSweptSpheresDataNV.html), [VkAccelerationStructureGeometrySpheresDataNV](VkAccelerationStructureGeometrySpheresDataNV.html), [VkAccelerationStructureGeometryTrianglesDataKHR](VkAccelerationStructureGeometryTrianglesDataKHR.html), [VkAccelerationStructureTrianglesDisplacementMicromapNV](VkAccelerationStructureTrianglesDisplacementMicromapNV.html), [VkAccelerationStructureTrianglesOpacityMicromapEXT](VkAccelerationStructureTrianglesOpacityMicromapEXT.html), [VkBindIndexBuffer3InfoKHR](VkBindIndexBuffer3InfoKHR.html), [VkBindIndexBufferIndirectCommandEXT](VkBindIndexBufferIndirectCommandEXT.html), [VkBindIndexBufferIndirectCommandNV](VkBindIndexBufferIndirectCommandNV.html), [VkGeometryTrianglesNV](VkGeometryTrianglesNV.html), [VkIndirectCommandsLayoutTokenNV](VkIndirectCommandsLayoutTokenNV.html), [vkCmdBindIndexBuffer](vkCmdBindIndexBuffer.html), [vkCmdBindIndexBuffer2](vkCmdBindIndexBuffer2.html), [vkCmdBindIndexBuffer2](vkCmdBindIndexBuffer2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkIndexType).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
