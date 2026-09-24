# VkDrawMeshTasksIndirectCommandNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDrawMeshTasksIndirectCommandNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDrawMeshTasksIndirectCommandNV - Structure specifying a mesh tasks draw indirect command

The `VkDrawMeshTasksIndirectCommandNV` structure is defined as:

// Provided by VK_NV_mesh_shader
typedef struct VkDrawMeshTasksIndirectCommandNV {
    uint32_t    taskCount;
    uint32_t    firstTask;
} VkDrawMeshTasksIndirectCommandNV;

* 
`taskCount` is the number of local workgroups to dispatch in the X
dimension.
Y and Z dimension are implicitly set to one.

* 
`firstTask` is the X component of the first workgroup ID.

The members of `VkDrawMeshTasksIndirectCommandNV` have the same meaning
as the similarly named parameters of [vkCmdDrawMeshTasksNV](vkCmdDrawMeshTasksNV.html).

Valid Usage

* 
[](#VUID-VkDrawMeshTasksIndirectCommandNV-taskCount-02175) VUID-VkDrawMeshTasksIndirectCommandNV-taskCount-02175

`taskCount` **must** be less than or equal to
`VkPhysicalDeviceMeshShaderPropertiesNV`::`maxDrawMeshTasksCount`

[VK_NV_mesh_shader](VK_NV_mesh_shader.html), [vkCmdDrawMeshTasksIndirectNV](vkCmdDrawMeshTasksIndirectNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkDrawMeshTasksIndirectCommandNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
