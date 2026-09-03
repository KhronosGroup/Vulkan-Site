# VkPhysicalDeviceMeshShaderPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceMeshShaderPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceMeshShaderPropertiesEXT - Structure describing mesh shading properties

The `VkPhysicalDeviceMeshShaderPropertiesEXT` structure is defined as:

// Provided by VK_EXT_mesh_shader
typedef struct VkPhysicalDeviceMeshShaderPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           maxTaskWorkGroupTotalCount;
    uint32_t           maxTaskWorkGroupCount[3];
    uint32_t           maxTaskWorkGroupInvocations;
    uint32_t           maxTaskWorkGroupSize[3];
    uint32_t           maxTaskPayloadSize;
    uint32_t           maxTaskSharedMemorySize;
    uint32_t           maxTaskPayloadAndSharedMemorySize;
    uint32_t           maxMeshWorkGroupTotalCount;
    uint32_t           maxMeshWorkGroupCount[3];
    uint32_t           maxMeshWorkGroupInvocations;
    uint32_t           maxMeshWorkGroupSize[3];
    uint32_t           maxMeshSharedMemorySize;
    uint32_t           maxMeshPayloadAndSharedMemorySize;
    uint32_t           maxMeshOutputMemorySize;
    uint32_t           maxMeshPayloadAndOutputMemorySize;
    uint32_t           maxMeshOutputComponents;
    uint32_t           maxMeshOutputVertices;
    uint32_t           maxMeshOutputPrimitives;
    uint32_t           maxMeshOutputLayers;
    uint32_t           maxMeshMultiviewViewCount;
    uint32_t           meshOutputPerVertexGranularity;
    uint32_t           meshOutputPerPrimitiveGranularity;
    uint32_t           maxPreferredTaskWorkGroupInvocations;
    uint32_t           maxPreferredMeshWorkGroupInvocations;
    VkBool32           prefersLocalInvocationVertexOutput;
    VkBool32           prefersLocalInvocationPrimitiveOutput;
    VkBool32           prefersCompactVertexOutput;
    VkBool32           prefersCompactPrimitiveOutput;
} VkPhysicalDeviceMeshShaderPropertiesEXT;

The members of the `VkPhysicalDeviceMeshShaderPropertiesEXT` structure
describe the following implementation-dependent limits:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `maxTaskWorkGroupTotalCount`
is the maximum number of local workgroups that **can** be launched for a
task shader by a [mesh tasks drawing command](../../../../spec/latest/chapters/drawing.html#drawing-mesh-shading).

* 
 `maxTaskWorkGroupCount`[3] is the
maximum number of local workgroups that **can** be launched for a task
shader in each dimension by a [mesh tasks drawing    command](../../../../spec/latest/chapters/drawing.html#drawing-mesh-shading).
These three values represent the maximum number of local workgroups for
the X, Y, and Z dimensions, respectively.
The workgroup count parameters to the drawing commands **must** be less
than or equal to the corresponding limit.
The product of these dimensions **must** be less than or equal to
`maxTaskWorkGroupTotalCount`.

* 
 `maxTaskWorkGroupInvocations`
    is the maximum total number of task shader invocations in a single local
    workgroup.
    The product of the X, Y, and Z sizes, as specified by the `LocalSize`
or `LocalSizeId`
    execution mode in shader modules or by the object decorated by the
    `WorkgroupSize` decoration, **must** be less than or equal to this
    limit.

* 
 `maxTaskWorkGroupSize`[3] is the
    maximum size of a local workgroup for a task shader in each dimension.
    These three values represent the maximum local workgroup size in the X,
    Y, and Z dimensions, respectively.
    The `x`, `y`, and `z` sizes, as specified by the
    `LocalSize`
or `LocalSizeId`
    execution mode or by the object decorated by the `WorkgroupSize`
    decoration in shader modules, **must** be less than or equal to the
    corresponding limit.

* 
 `maxTaskPayloadSize` is the maximum
total storage size, in bytes, available for variables declared with the
`TaskPayloadWorkgroupEXT` storage class in shader modules in the task
shader stage.

* 
 `maxTaskSharedMemorySize` is the
maximum total storage size, in bytes, available for variables declared
with the `Workgroup` storage class in shader modules in the task
shader stage.

* 

`maxTaskPayloadAndSharedMemorySize` is the maximum total storage
size, in bytes, available for variables that are declared with the
`TaskPayloadWorkgroupEXT` or `Workgroup` storage class, in shader
modules in the task shader stage.

* 
 `maxMeshWorkGroupTotalCount`
is the maximum number of local workgroups that **can** be launched for a
mesh shader, either directly by a [mesh tasks    drawing command](../../../../spec/latest/chapters/drawing.html#drawing-mesh-shading), or emitted by a single task shader workgroup.

* 
 `maxMeshWorkGroupCount`[3] is the
maximum number of local workgroups that **can** be launched for a mesh
shader in each dimension, either directly by a
[mesh tasks drawing command](../../../../spec/latest/chapters/drawing.html#drawing-mesh-shading), or emitted by a
single task shader workgroup.
These three values represent the maximum number of local output tasks
for the X, Y, and Z dimensions, respectively.
The workgroup count parameters to the `OpEmitMeshTasksEXT` **must** be
less than or equal to the corresponding limit.
The product of these dimensions **must** be less than or equal to
`maxMeshWorkGroupTotalCount`.

* 
 `maxMeshWorkGroupInvocations`
    is the maximum total number of mesh shader invocations in a single local
    workgroup.
    The product of the X, Y, and Z sizes, as specified by the `LocalSize`
or `LocalSizeId`
    execution mode in shader modules or by the object decorated by the
    `WorkgroupSize` decoration, **must** be less than or equal to this
    limit.

* 
 `maxMeshWorkGroupSize`[3] is the
    maximum size of a local workgroup for a mesh shader in each dimension.
    These three values represent the maximum local workgroup size in the X,
    Y, and Z dimensions, respectively.
    The `x`, `y`, and `z` sizes, as specified by the
    `LocalSize`
or `LocalSizeId`
    execution mode or by the object decorated by the `WorkgroupSize`
    decoration in shader modules, **must** be less than or equal to the
    corresponding limit.

* 
 `maxMeshSharedMemorySize` is the
maximum total storage size, in bytes, available for variables declared
with the `Workgroup` storage class in shader modules in the mesh
shader stage.

* 

`maxMeshPayloadAndSharedMemorySize` is the maximum total storage
size, in bytes, available for variables that are declared with the
`TaskPayloadWorkgroupEXT` or `Workgroup` storage class in shader
modules in the mesh shader stage.

* 
 `maxMeshOutputMemorySize` is the
maximum total storage size, in bytes, available for output variables in
shader modules in the mesh shader stage, according to the formula in
[Mesh Shader Output](../../../../spec/latest/chapters/VK_NV_mesh_shader/mesh.html#mesh-output).

* 

`maxMeshPayloadAndOutputMemorySize` is the maximum total storage
size, in bytes, available for variables that are declared with the
`TaskPayloadWorkgroupEXT` storage class, or output variables in
shader modules in the mesh shader stage, according to the formula in
[Mesh Shader Output](../../../../spec/latest/chapters/VK_NV_mesh_shader/mesh.html#mesh-output).

* 
 `maxMeshOutputComponents` is the
maximum number of components of output variables which **can** be output
from the mesh shader stage.

* 
 `maxMeshOutputVertices` is the
maximum number of vertices which **can** be emitted by a single mesh shader
workgroup.

* 
 `maxMeshOutputPrimitives` is the
maximum number of primitives which **can** be emitted by a single mesh
shader workgroup.

* 
 `maxMeshOutputLayers` is one greater
than the maximum layer index that **can** be output from the mesh shader
stage.

* 
 `maxMeshMultiviewViewCount` is
one greater than the maximum view index that **can** be used by any mesh
shader.

* 

`meshOutputPerVertexGranularity` is the granularity of vertex
allocation.
The number of output vertices allocated for the mesh shader stage is
padded to a multiple of this number.
The value can be used to calculate the required storage size for output
variables in shader modules in the mesh shader stage, which **must** be
less than or equal to `maxMeshOutputMemorySize`.

* 

`meshOutputPerPrimitiveGranularity` is the granularity of primitive
allocation.
The number of output primitives allocated for the mesh shader stage is
padded to a multiple of this number.
The value can be used to calculate the required storage size for output
variables in shader modules in the mesh shader stage, which **must** be
less than or equal to `maxMeshOutputMemorySize`.

* 

`maxPreferredTaskWorkGroupInvocations` is the maximum number of task
shader invocations in a single workgroup that is preferred by the
implementation for optimal performance.
The value is guaranteed to be a multiple of a supported subgroup size
for the task shader stage.

* 

`maxPreferredMeshWorkGroupInvocations` is the maximum number of mesh
shader invocations in a single workgroup that is preferred by the
implementation for optimal performance.
The value is guaranteed to be a multiple of a supported subgroup size
for the mesh shader stage.

* 

`prefersLocalInvocationVertexOutput` specifies whether writes to the
vertex output array in a mesh shader yield best performance when the
array index matches `LocalInvocationIndex`.

* 

`prefersLocalInvocationPrimitiveOutput` specifies whether writes to
the primitive output array in a mesh shader yield best performance when
the array index matches `LocalInvocationIndex`.

* 
 `prefersCompactVertexOutput`
specifies whether output vertices should be compacted after custom
culling in the mesh shader for best performance, otherwise keeping the
vertices at their original location may be better.

* 

`prefersCompactPrimitiveOutput` specifies whether output primitives
should be compacted after custom culling in the mesh shader for best
performance, otherwise the use of `CullPrimitiveEXT` may be better.

If the `VkPhysicalDeviceMeshShaderPropertiesEXT` structure is included
in the `pNext` chain of [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html), it is filled
with the implementation-dependent limits.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMeshShaderPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceMeshShaderPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_PROPERTIES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html)

[VK_EXT_mesh_shader](VK_EXT_mesh_shader.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/limits.html#VkPhysicalDeviceMeshShaderPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
