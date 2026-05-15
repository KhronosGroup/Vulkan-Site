# VK_EXT_shader_split_barrier

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_EXT_shader_split_barrier.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. SPIR-V](#_spir_v)
- [3.2. High Level Language Exposure](#_high_level_language_exposure)
- [3.2._High_Level_Language_Exposure](#_high_level_language_exposure)
- [3.3. Features and Properties](#_features_and_properties)
- [3.3._Features_and_Properties](#_features_and_properties)
- [4. Examples](#_examples)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. SPIR-V](#_spir_v)
[3.2. High Level Language Exposure](#_high_level_language_exposure)
[3.3. Features and Properties](#_features_and_properties)

[4. Examples](#_examples)

This document proposes a new extension that exposes split barriers in
compute shaders.

Workgroup control barriers in compute shaders control the execution order of subgroups within a workgroup
and synchronize memory access.

However, in performance-critical compute loops this hard sync point can create a
synchronization bottleneck due to not being able to let fast subgroups race ahead to
continue independent work.

Considering one example where an application is performing a tiled matrix multiplication staged
through shared memory using [VK_KHR_cooperative_matrix](../../../../refpages/latest/refpages/source/VK_KHR_cooperative_matrix.html),
a standard `barrier()` significantly impacts memory throughput:

    for (uint32_t step = 0; step  Shared Copy (High Latency)
        // Only needs to wait for step 2 to complete in previous iteration, but blocked on step 3 by barrier
        ...
        barrier();

        // 2. Shared -> Private load
        coopMatLoad(matA, inputA.x, subMatrixAStartInElements, strideAinElements, int(layoutA_Mfirst));
        coopMatLoad(matB, inputB.x, subMatrixBStartInElements, strideBinElements, int(layoutB_Kfirst));

        // 3. Math using private memory (ALU heavy)
        matR = coopMatMulAdd(matA, matB, matC);

        // 4. Hard sync
        // Wait for ALL subgroups to complete step 3 before allowing ANY subgroup to overwrite shared memory
        barrier();
    }

When a workgroup processes a tile, a standard barrier forces all subgroups to complete their
heavy ALU operations (e.g., `coopMatMulAdd`) before any subgroup can proceed to the next iteration.
This prevents "fast" subgroups from issuing the long-latency Global-to-Shared memory fetches for the
subsequent tile while "slow" subgroups are still performing ALU work.

Consequently, the memory subsystem remains underutilized, creating a bubble in memory occupancy
that cannot be hidden by the ALU.

For an application not staging through shared memory, this loop would not need barriers
for functional behavior due to loading from global memory. However, those applications may still benefit
from barriers to help with occupancy between memory access and ALU operations - but not with the current
barrier model.

A better solution is to introduce a split-sync model. By separating the barrier into "Arrival"
and "Wait" phases, a subgroup can signal when it has finished accessing a shared resource without blocking
its own execution.

Arrival (split_barrier_arrive): Informs the workgroup that the subgroup has finished reading from/writing
to the shared resource (e.g., Shared Memory).

Wait (split_barrier_wait): Blocks the subgroup until all subgroups in the workgroup have signaled their arrival.

This allows a subgroup to "check in" immediately after its Shared-to-Private load, perform its matrix math, and then hit the wait.
If all other subgroups have also "checked in" (meaning they have safely finished reading the current tile from Shared Memory),
the fast subgroup can immediately begin the next iteration’s Global Memory fetch, overlapping the memory latency of the next tile
with the ALU latency of the current tile in slower subgroups.

The extension exposes two new barrier operations with
[SPV_EXT_split_barrier](https://github.com/KhronosGroup/SPIRV-Registry/tree/main/extensionsEXT/SPV_EXT_split_barrier.html).

| **OpControlBarrierArriveEXT**
| --- | --- | --- | --- | --- |

Indicates that an invocation has arrived at a split control barrier.
This may allow other invocations waiting on the split control barrier to continue executing.

When *Execution* is **Workgroup** or larger, behavior is undefined unless all invocations within *Execution* execute the same dynamic instance of this instruction.
When *Execution* is **Subgroup** or **Invocation**, the behavior of this instruction in non-uniform control flow is defined by the client API.

If *Semantics* is not **None**, this instruction also serves as the start of a memory barrier similar to an **OpMemoryBarrier** instruction with the same *Memory* and *Semantics* operands.
This allows atomically specifying both a control barrier and a memory barrier (that is, without needing two instructions). If *Semantics* is **None**, *Memory* is ignored. | Capability:

**SplitBarrierEXT** |
| 4 | 6142 | *Scope *

*Execution* | *Scope *

*Memory* | *Memory Semantics *

*Semantics* |

| **OpControlBarrierWaitEXT**
| --- | --- | --- | --- | --- |

Waits for other invocations of this module to arrive at a split control barrier.

When *Execution* is **Workgroup** or larger, behavior is undefined unless all invocations within *Execution* execute the same dynamic instance of this instruction.
When *Execution* is **Subgroup** or **Invocation**, the behavior of this instruction in non-uniform control flow is defined by the client API.

If *Semantics* is not **None**, this instruction also serves as the end of a memory barrier similar to an **OpMemoryBarrier** instruction with the same *Memory* and *Semantics* operands.
This ensures that memory accesses issued before arriving at the split barrier are observed before memory accesses issued after this instruction.
This control is ensured only for memory accesses issued by this invocation and observed by another invocation executing within *Memory* scope.
This allows atomically specifying both a control barrier and a memory barrier (that is, without needing two instructions). If *Semantics* is **None**, *Memory* is ignored. | Capability:

**SplitBarrierEXT** |
| 4 | 6143 | *Scope *

*Execution* | *Scope *

*Memory* | *Memory Semantics *

*Semantics* |

This functionality is gated behind a new SPIR-V capability:

| Capability | Implicitly declares |
| --- | --- |
| 6141 | **SplitBarrierEXT** |  |

This capability is only permitted in compute shaders. Unlike `OpControlBarrier`,
tessellation, mesh, and ray pipeline shaders are not permitted.

While the SPIRV instructions include parameters similar to control barriers,
Vulkan requires `Execution Scope` be `Workgroup` or `Subgroup`, and there are
additional restrictions on `Acquire` and `Release` memory semantics.

The following summarizes how the split barrier is exposed in GLSL:

--------------------------------------------------------------------------------------------
| void controlBarrierArrive() | For any given static instance of controlBarrierArrive()    |
|                             | it registers that an invocation executing it has arrived.  |
|                             | This may allow other invocations waiting on a              |
|                             | controlBarrierWait() instance to continue executing.       |
|                             | Only available in compute shaders.                         |
--------------------------------------------------------------------------------------------
| void controlBarrierWait()   | It indicates that an invocation should "wait" for other    |
|                             | invocations to arrive at the controlBarrierArrive()        |
|                             | before executing further. All compute shader invocations   |
|                             | for a single workgroup must have arrived at                |
|                             | controlBarrierArrive() before any will continue beyond it. |
|                             | Only available in compute shaders.                         |
--------------------------------------------------------------------------------------------

This barrier specifies both an execution barrier as described in the definitions above and
specifies a memory barrier. The memory barrier only synchronizes accesses to shared variables.
A separate memoryBarrier needs to be specified in order to synchronize other accesses.

If a split barrier pair is placed within control flow, it must be dynamically uniform. All controlling
expressions must uniformly execute this pair or it could cause a deadlock. For example,
if some invocations skip calling arrive, wait may never unblock.

If the [GL_KHR_memory_scope_semantics](https://github.com/KhronosGroup/GLSL/tree/main/extensionskhr/GL_KHR_memory_scope_semantics.txt) extension
is supported, the following are available:

--------------------------------------------------------------------------------------------
| void controlBarrierArrive(  | For any given static instance of controlBarrierArrive(...) |
|  int execution,int memory,  | it registers that an invocation executing it has arrived.  |
|  int storage, int sem);     | This may allow other invocations in the same workgroup     |
|                             | waiting at a controlBarrierWait(...) instance to continue  |
|                             | executing.                                                 |
--------------------------------------------------------------------------------------------
| void controlBarrierWait(    | It indicates that an invocation should "wait" for other    |
|  int execution, int memory, | invocations in the same workgroup to arrive at the         |
|  int storage, int sem);     | corresponding controlBarrierArrive(...) before executing   |
|                             | further. All invocations in the workgroup must have        |
|                             | arrived at controlBarrierArrive(...) before any may        |
|                             | continue beyond it.                                        |
--------------------------------------------------------------------------------------------

The restrictions are defined in the `GL_KHR_memory_scope_semantics` extension section "Scope and Semantics`, with the additional restrictions:
  * Only `gl_SemanticsRelease`, `gl_SemanticsMakeAvailable`, or `gl_SemanticsRelaxed` are valid to be used with `controlBarrierArrive`
  * Only `gl_SemanticsAcquire`, `gl_SemanticsMakeVisible`, or `gl_SemanticsRelaxed` are valid to be used with `controlBarrierWait`

Additionally, `execution` must be set to `gl_ScopeWorkgroup` or `gl_ScopeSubgroup`.

Like `splitBarrierArrive`/`splitBarrierWait`, these must be called within uniform control flow if `execution` is
set to `gl_ScopeWorkgroup`.

A new feature is added with this extension:

typedef struct VkPhysicalDeviceShaderSplitBarrierFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderSplitBarrier;
} VkPhysicalDeviceShaderSplitBarrierFeaturesEXT;

* 
`shaderSplitBarrier` indicates that the implementation supports SPIR-V modules
declaring the `SplitBarrierEXT` capability.

A new property is added with this extension:

typedef struct VkPhysicalDeviceShaderSplitBarrierPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           splitBarrierReservedSharedMemory;
} VkPhysicalDeviceShaderSplitBarrierPropertiesEXT;

* 
`splitBarrierReservedSharedMemory` indicates the amount of shared memory reserved
by the implementation in bytes out of `maxComputeSharedMemorySize` when using split
barriers in the shader

This example illustrates how to use a split barrier to increase concurrency between
subgroups.

|  | This example is not prescribing a reference implementation for how to perform tiled
| --- | --- |
cooperative matrix operations. When staging through shared memory it may be recommended
to pull step 1 out of the tile loop - that was not done here to keep the example simple.

On at least one implementation, it is recommended to load directly from global memory to
private memory and skip staging through shared memory. Using split barriers is still useful
here to keep ALU and memory access fully occupied across the subgroups. |

    for (uint32_t step = 0; step  Shared Copy (High Latency)
        // Start occupying memory lanes while subgroups are still crunching step 3 from last tile
        ...
        barrier();

        // 2. Shared -> Private load
        coopMatLoad(matA, inputA.x, subMatrixAStartInElements, strideAinElements, int(layoutA_Mfirst));
        coopMatLoad(matB, inputB.x, subMatrixBStartInElements, strideBinElements, int(layoutB_Kfirst));

        // Signal to workgroup this subgroup is done using shared memory
        splitBarrierArrive();

        // 3. Math using private memory (ALU heavy)
        matR = coopMatMulAdd(matA, matB, matC);

        // 4. Only wait for all subgroups to finish step 2 before proceeding to next tile.
        // Do not wait for all subgroups to complete step 3.
        splitBarrierWait();
    }
