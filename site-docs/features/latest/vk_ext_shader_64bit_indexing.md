# VK_EXT_shader_64bit_indexing

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_shader_64bit_indexing.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

This extension relaxes the maxStorageBufferRange limit, allowing more than
4GB to be accessed through a buffer binding (or through a buffer device
address).
It adds pipeline and shader creation flags that request 64-bit addressing
support, and [defines](#spirvenv-64bindexing) which addressing calculations use
64 bits of range.

Storage buffers in Vulkan have been limited to less than 4GB of range due
to the 32-bit [maxStorageBufferRange](#limits-maxStorageBufferRange) limit.
There has been demand for larger buffers, particularly for implementing
large machine learning models.
Implementations have taken advantage of the 32-bit
[maxStorageBufferRange](#limits-maxStorageBufferRange) to use 32-bit integers for addressing
calculations (aside from adding in a 64-bit base address), so 64-bit support
needs to be added in a way that does not reduce performance for workloads
that do not need it.

There clearly needs to be a way to opt in to the new functionality, and it is
desirable not to have to have multiple copies of a shader in order to handle
implementations that do not support 64-bit indexing, or just for cases that use
smaller buffers and do not need to pay the cost. So opting in at pipeline/shader
creation time makes the most sense.

There are some 32-bit assumptions baked into SPIR-V in a few places, for
example in the return type of OpArrayLength, and in cooperative matrix and
cooperative vector extensions.
Rather than requiring use of a new SPIR-V extension to relax this, we will make the
existing SPIR-V specs more flexible and move the restrictions to the Vulkan
SPIR-V environment space.
There is a new extension SPV_EXT_shader_64bit_indexing with an execution mode
Shader64BitIndexingEXT that enables 64-bit addressing, or it can be enabled
using a pipeline or shader creation flag.

If the new [shader64BitIndexing](#features-shader64BitIndexing) feature is enabled,
[maxStorageBufferRange](#limits-maxStorageBufferRange) no longer applies.
However, applications should be careful not to access descriptors with more
than 4GB of range without requesting 64-bit support for the shader, as this
would lead to undefined behavior.

For shaders that request 64-bit addressing support, the runtime-sized array
in the SSBO can access more than 4GB.
This also applies to PhysicalStorageBuffer accesses.
A single structure or statically-sized array must still be less than 4GB,
in part to avoid needing 64-bit Offset/ArrayStride decorations, but
implementations can also take advantage of this to use 32 bits of range
for that portion of the addressing calculations.
SPIR-V already allowed for 64-bit integers to be used in OpAccessChain, so
no change is needed there.

Cooperative Vector SPIR-V instructions that access memory are relaxed to
allow 64-bit integers for the offsets.

Cooperative Matrix 2 SPIR-V instructions are changed to use 64 bits of
range for the "tensorCoordToLinear" calculations.
